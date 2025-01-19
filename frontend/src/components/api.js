export const fetchCodeSummary = async (token, file_path, repo_url) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/code-summary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token, file_path, repo_url }),
          });

        if (!response.ok) {
            throw new Error("Failed to fetch code summary");
        }

        const summaryData = await response.json();
        return summaryData;
    } catch (error) {
        console.error("Error fetching code summary:", error);
        throw error; 
    }
};
