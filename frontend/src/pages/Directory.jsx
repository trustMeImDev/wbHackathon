/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Graph from "@/components/graph";
import InfoSection from "@/components/info-section"; 
import { useLocation } from "react-router";
import Cookie from "js-cookie";


function Directory() {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const repo = params.get('repo');
    const [data, setData] = useState(null);
    const [selectedNode, setSelectedNode] = useState("default");
    const [fileSummaryData, setFileSummaryData] = useState(null);
    const [fileTextSummary, setFileTextSummary] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const repoData = localStorage.getItem(repo);
                const parsedData = await JSON.parse(repoData);
                console.log(parsedData)
                if (repoData) {
                    setData(parsedData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (repo) {
            fetchData();
        }
    }, []);

    // Handle node click
    const handleNodeClick = async(node) => {
        console.log(node.type)
        if(node.type === "file"){
            console.log(node)
            const pathArray = node.id.split('-').slice(1);
            const path = pathArray.join('/');
            const owner = repo.split('/')[0];
            const githubUrl = `https://github.com/${repo}`;
            setSelectedNode(node); // Update the selected node data
            const authToken = Cookie.get("authToken");
            console.log(authToken)
            try {
                const response = await fetch('http://127.0.0.1:5000/code-summary', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({ file_path:path, repo_url:githubUrl }),
                });
                const summaryData = await response.json();
                console.log(summaryData)
                setFileSummaryData(summaryData);
                setFileTextSummary(summaryData.summary);
            } catch (error) {
                console.error('Error fetching file summary:', error);
            }
        }
    };

    return (
        <div className="flex h-full w-full">
            {/* Pass handleNodeClick to the Graph */}
            {
                data ? <Graph data={data} onNodeClick={handleNodeClick}/> : 
                <div className="h-screen w-screen flex items-center justify-center">
                    <div className="loader animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600"></div>
                </div>
            }
            {/* Pass selectedNode to the InfoSection */}
            <InfoSection selectedNodeData={selectedNode} fileSummaryData={fileSummaryData} fileTextSummary={fileTextSummary} />
        </div>
    );
}

export default Directory;
