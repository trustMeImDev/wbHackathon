import os
import jwt
# import pyrebase
import requests
from firebase_admin import firestore, initialize_app, credentials
from flask import Flask, request, redirect, jsonify, session, make_response
from flask_cors import CORS

app = Flask(__name__)

# Your GitHub App details
GITHUB_CLIENT_ID = "Iv23lif3gDv1sSQ71VVm"
GITHUB_CLIENT_SECRET = "d4ec8e71edcac7b3f2b99ac70d26373874b7ba8f"  # You get this when registering your GitHub App
GITHUB_API_URL = "https://api.github.com"
GITHUB_CALLBACK_URL = "http://127.0.0.1:5000/callback"  # Your callback URL

# Secret for session management
app.secret_key = "your_random_secret_key"  # Change this to a strong random secret key

CORS(app)

cred_path = os.path.join(os.path.dirname(__file__), "serviceAccount.json")
cred = credentials.Certificate(cred_path)
initialize_app(cred)
db = firestore.client()

@app.route('/verify-token', methods=['POST'])
def verify_token():
    token = request.json.get("token")
    if not token:
        return jsonify({"error": "Token not provided"}), 400
    try:
        decoded_token = jwt.decode(token, app.secret_key, algorithms=["HS256"])
        print(decoded_token)
        user_id = decoded_token.get("id")
        user_ref = db.collection("users").document(str(user_id))
        user = user_ref.get()
        if user.exists:
            user_data = user.to_dict()
            return jsonify(user_data)
        else:
            return jsonify({"error": "User not found"}), 404
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

@app.route('/login')
def login():
    params = {
        "client_id": GITHUB_CLIENT_ID,
        "redirect_uri": GITHUB_CALLBACK_URL,
        "scope": "repo",
        "state": "random_state_string",
    }
    github_oauth_url = f"https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}&redirect_uri={GITHUB_CALLBACK_URL}"
    return redirect(github_oauth_url)


@app.route('/callback')
def callback():
    code = request.args.get('code')
    if not code:
        return jsonify({"error": "Authorization failed. No code received."}), 400

    # Step 3: Exchange code for access token
    access_token_url="https://github.com/login/oauth/access_token"
    headers = {'Accept': 'application/json'}
    payload = {
        "client_id": GITHUB_CLIENT_ID,
        "client_secret": GITHUB_CLIENT_SECRET,
        "code": code,
    }

    response = requests.post(access_token_url, data=payload, headers=headers)
    response_data = response.json()
    access_token = response_data.get('access_token')

    if access_token:
        user_response = requests.get("https://api.github.com/user", headers={
            "Authorization": f"Bearer {access_token}"
        })

        if user_response.status_code != 200:
            return jsonify({"error": "Failed to obtain user details."}), 500
        
        user_data = user_response.json()
        user_id = user_data.get("id")
        email = user_data.get("email")
        username = user_data.get("login")
        avatar = user_data.get("avatar_url")

        user_info = {
            "id": user_id,
            "email": email,
            "username": username,
            "avatar": avatar,
            "access_token": access_token,
        }

        user_ref = db.collection("users")
        user_ref.document(str(user_id)).set(user_info)

        jwt_token_payload = {"id": user_id}
        jwt_token = jwt.encode(jwt_token_payload, app.secret_key, algorithm="HS256")

        return redirect(f"http://localhost:5173/authenticated?token={jwt_token}")
    else:
        return jsonify({"error": "Failed to obtain access token."}), 400

@app.route('/get-repo-info', methods=['GET'])
def get_repo_info():
    if 'access_token' not in session:
        return jsonify({"error": "Unauthorized. Please log in first."}), 403

    access_token = session['access_token']
    repo_url = request.args.get('repo_url')
    if not repo_url:
        return jsonify({"error": "Please provide a GitHub repository URL."}), 400

    try:
        repo_path = repo_url.replace("https://github.com/", "").strip("/").split("/")
        if len(repo_path) < 2:
            return jsonify({"error": "Invalid GitHub repository URL."}), 400

        owner, repo_name = repo_path[:2]
        headers = {"Authorization": f"Bearer {access_token}"}

        # Fetch file structure from GitHub
        def fetch_files(directory=""):
            url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/contents/{directory}"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            contents = response.json()
            files = []
            for item in contents:
                if item["type"] == "dir":
                    files.extend(fetch_files(item["path"]))  # Recursively fetch files from directories
                else:
                    files.append({"path": item["path"], "name": item["name"]})
            return files

        file_structure = fetch_files()
        return jsonify(file_structure)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"GitHub API request failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
