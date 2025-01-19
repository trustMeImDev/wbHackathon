# CodeFlo: Navigating Complexity, Empowering Development

## Introduction

CodeFlo is an advanced AI-driven platform designed to streamline the exploration and analysis of complex software systems. By offering dynamic visualizations, automated dependency tracking, and concise codebase summaries, CodeFlo empowers developers to efficiently navigate, analyze, and understand large, intricate systems. Built on cutting-edge technologies, CodeFlo integrates AI-driven insights with user-friendly interfaces to help developers identify architectural risks, reduce onboarding time, and boost productivity.

## Features

CodeFlo combines a set of advanced technical capabilities to deliver a comprehensive platform for code exploration and analysis:

- **Interactive Code Visualization**: Transforms large, multi-module systems into visually interactive flow diagrams that allow users to traverse codebase hierarchies, function relationships, and dependency chains.
- **AI-Powered Summarization**: Uses large language models (LLMs) to generate file-level and function-level summaries, helping developers quickly grasp the intent and functionality of specific components.
- **Dependency Analysis**: Identifies and highlights critical dependencies between files, modules, and functions to minimize risks when updating code.
- **Recursion Analysis**: Provides graphical representations of recursion stacks to assist in debugging and optimizing recursive algorithms.
- **Seamless Onboarding**: Reduces cognitive load and accelerates onboarding with visual tools and summaries for new developers.

## Technology Stack

CodeFlo is built using a modern, modular architecture that integrates the following technologies:

- **Backend**: Python with Worqhat API for programmatic analysis and natural language processing.
- **Frontend**: React-based frontend combined with React Flow for dynamic rendering of codebase visualizations.
- **Data Integration**: GitHub APIs are used to retrieve metadata, file hierarchies, and code content from public and private repositories.
- **AI Models**: Worqhat's Generative AI models analyze code to provide structural insights, summarization, and dependency extraction.
- **Visualization Framework**: React Flow is employed for graphical representation and user interaction with codebase structures.

## Working Mechanism

The CodeFlo platform follows a streamlined, four-step workflow for analyzing and visualizing codebases:

1. **Repository Integration**: Users provide a GitHub repository URL. The GitHub API retrieves data, including file structures, metadata, and source code.
2. **Backend Analysis**: Python backend processes the extracted data using Worqhat APIs to generate summaries, identify dependencies, and extract structural insights.
3. **Data Transformation**: The analyzed data is converted into a structured JSON format, optimized for visualization.
4. **Frontend Rendering**: React Flow uses the structured data to generate interactive flowcharts, enabling developers to explore the codebase dynamically.

## Target Market

CodeFlo is designed for a wide range of professionals and domains:

- **Junior Developers**: Simplifies onboarding and provides intuitive tools for understanding codebases.
- **Development Teams**: Enhances collaboration by providing insights into architectural dependencies.
- **Educators**: Serves as an interactive teaching tool for large-scale software systems.
- **Project Managers**: Offers high-level overviews of project architectures for strategic planning.
- **Open-Source Contributors**: Helps contributors quickly familiarize themselves with complex repositories.

## Benefits

CodeFlo provides several key benefits:

- **Accelerated Onboarding**: Reduces the time for new developers to become productive by offering visual tools and summaries.
- **Enhanced Productivity**: Frees developers from tedious code exploration tasks, allowing them to focus on high-value work.
- **Risk Mitigation**: Identifies architectural vulnerabilities early, preventing functionality-breaking errors.
- **Effective Learning**: Supports deeper understanding of code through AI-generated summaries and interactive visualizations.
- **Scalability**: Handles repositories of varying sizes and complexities, suitable for different industries and domains.

## Future Scope

CodeFlo has the potential for significant future developments:

- **Advanced AI Analysis**: Incorporation of next-generation AI models for handling even more complex codebases.
- **Multi-Repository Analysis**: Support for interconnected repositories, aiding in microservices architecture analysis.
- **Platform Integration**: Expansion to GitLab, Bitbucket, and other version control platforms.
- **Collaborative Features**: Real-time collaboration tools for team-based code exploration.
- **Custom Learning Paths**: Role-specific AI-powered guidance tailored to individual skill levels.
- **Mobile Accessibility**: Development of mobile apps for codebase exploration on the go.

## Conclusion

CodeFlo revolutionizes the process of codebase exploration by combining AI-driven insights with intuitive visualizations. By simplifying complex systems and improving productivity, CodeFlo stands as an essential tool for developers, enhancing their ability to navigate and understand codebases with ease.

## Contributors

- Atharva Kotekar
- Nia UK
- Samit Tungare
- Ghanasham Patil

## Installation

To get started with CodeFlo, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/trustMeImDev/wbHackathon
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    # or using yarn
    yarn install
    ```

3. Set up your backend by installing Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the app:
    - Frontend: 
        ```bash
        npm start
        # or
        yarn start
        ```
    - Backend:
        ```bash
        python app.py
        ```
