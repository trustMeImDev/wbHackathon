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

        def fetch_files(directory=""):
            url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/contents/{directory}"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            contents = response.json()

            directory_structure = []
            for item in contents:
                if item["type"] == "dir":
                    directory_structure.append({
                        "name": item["name"],
                        "type": "directory",
                        "children": fetch_files(item["path"])
                    })
                else:
                    directory_structure.append({
                        "name": item["name"],
                        "type": "file"
                    })
            return directory_structure

        repo_structure = {
            "name": "root",
            "type": "directory",
            "children": fetch_files()
        }

        return jsonify(repo_structure)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"GitHub API request failed: {str(e)}"}), 500


def get_file_contents(repo_url, file_path, access_token):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.github.v3.raw"
    }

    repo_name = repo_url.split("github.com/")[1]
    file_url = f"https://api.github.com/repos/{repo_name}/contents/{file_path}"

    response = requests.get(file_url, headers=headers)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch file contents from GitHub"}), response.status_code

    file_contents = response.text
    return file_contents