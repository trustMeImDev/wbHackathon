from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# GitHub API and Worqhat API configurations
GITHUB_API_URL = "https://api.github.com"
GITHUB_ACCESS_TOKEN = "your_github_access_token"
WORQHAT_API_URL = "https://api.worqhat.com/analyze"
WORQHAT_API_KEY = "your_worqhat_api_key"

@app.route('/generate-flowchart', methods=['GET'])
def generate_flowchart():
    repo_url = request.args.get('repo_url')
    if not repo_url:
        return jsonify({"error": "Please provide a GitHub repository URL."}), 400

    try:
        # Extract owner and repository name
        repo_path = repo_url.replace("https://github.com/", "").strip("/").split("/")
        if len(repo_path) < 2:
            return jsonify({"error": "Invalid GitHub repository URL."}), 400

        owner, repo_name = repo_path[:2]
        headers = {"Authorization": f"token {GITHUB_ACCESS_TOKEN}"}

        # Fetch file structure from GitHub
        def fetch_files(directory=""):
            url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/contents/{directory}"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            contents = response.json()
            files = []
            for item in contents:
                if item["type"] == "dir":
                    files.extend(fetch_files(item["path"]))
                else:
                    files.append({"path": item["path"], "name": item["name"]})
            return files

        file_structure = fetch_files()

        # Send file structure to Worqhat API
        worqhat_response = requests.post(
            WORQHAT_API_URL,
            json={"files": file_structure},
            headers={"Authorization": f"Bearer {WORQHAT_API_KEY}"}
        )
        worqhat_response.raise_for_status()

        # Return structured data
        return jsonify(worqhat_response.json())

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
