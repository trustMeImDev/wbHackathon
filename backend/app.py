from flask import Flask, request, redirect, jsonify, session
import requests
from urllib.parse import urlencode, quote_plus

app = Flask(__name__)

# Your GitHub App details
GITHUB_CLIENT_ID = "Iv23lif3gDv1sSQ71VVm"
GITHUB_CLIENT_SECRET = "d4ec8e71edcac7b3f2b99ac70d26373874b7ba8f"  # You get this when registering your GitHub App
GITHUB_API_URL = "https://api.github.com"
GITHUB_CALLBACK_URL = "http://127.0.0.1:5000/callback"  # Your callback URL

# Secret for session management
app.secret_key = "your_random_secret_key"  # Change this to a strong random secret key

# Step 1: Redirect user to GitHub's authorization page
@app.route('/login')
def login():
    # Define the GitHub OAuth URL with your Client ID and Callback URL
    params = {
        "client_id": GITHUB_CLIENT_ID,
        "redirect_uri": GITHUB_CALLBACK_URL,
        "scope": "repo",  # Request repository access
        "state": "random_state_string",  # Use a random state to prevent CSRF attacks
    }
    github_oauth_url = f"https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}&redirect_uri={GITHUB_CALLBACK_URL}"
    return redirect(github_oauth_url)

# Step 2: Handle the redirect after GitHub authorization
@app.route('/callback')
def callback():
    code = request.args.get('code')
    if not code:
        return jsonify({"error": "Authorization failed. No code received."}), 400

    # Step 3: Exchange code for access token
    payload = {
        "client_id": GITHUB_CLIENT_ID,
        "client_secret": GITHUB_CLIENT_SECRET,
        "code": code,
    }

    response = requests.post('https://github.com/login/oauth/access_token', data=payload, headers={'Accept': 'application/json'})
    response_data = response.json()
    access_token = response_data.get('access_token')

    if access_token:
        # session['access_token'] = response_data['access_token']
        print(access_token)
        return redirect("http://localhost:5173/?success=true")
    else:
        return jsonify({"error": "Failed to obtain access token."}), 400

# Step 4: Use the access token to access GitHub API (fetch repository information)
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
