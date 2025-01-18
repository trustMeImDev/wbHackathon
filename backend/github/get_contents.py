import os
import jwt
import requests
from firebase_admin import firestore, initialize_app, credentials
from flask import Flask, request, redirect, jsonify, session, make_response
from flask_cors import CORS

GITHUB_API_URL = "https://api.github.com"

def get_repo_structure(currentUser, repo_url):

    if not currentUser:
        return jsonify({"error": "User not found"}), 404
    if not repo_url:
        return jsonify({"error": "Please provide a GitHub repository URL."}), 400

    try:
        repo_path = repo_url.replace("https://github.com/", "").strip("/").split("/")
        if len(repo_path) < 2:
            return jsonify({"error": "Invalid GitHub repository URL."}), 400

        owner, repo_name = repo_path[:2]
        headers = {"Authorization": f"Bearer {currentUser['access_token']}"}

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
        print(file_structure)
        return jsonify(file_structure)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"GitHub API request failed: {str(e)}"}), 500