/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Graph from "@/components/graph";
import InfoSection from "@/components/info-section"; 
import { useLocation } from "react-router";

function Directory() {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const repo = params.get('repo');
    const [data, setData] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    
    
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
    const handleNodeClick = (node) => {
        console.log(node.type)
        if(node.type === "file"){
            console.log(node)
            const path = node.id.split('-').join('/');
            console.log(path)
            // setSelectedNode(node); // Update the selected node data

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
            <InfoSection selectedNodeData={selectedNode} />
        </div>
    );
}

export default Directory;
