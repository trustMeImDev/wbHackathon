import React, { useState } from "react";
import Graph from "@/components/graph";
import InfoSection from "@/components/info-section"; 

function Directory() {
    const [selectedNode, setSelectedNode] = useState(null);

    const fstruct = {
        name: "hackathon_project",
        type: "directory",
        children: [
            {
                name: "src",
                type: "directory",
                children: [
                    {
                        name: "index.js",
                        type: "file"
                    },
                    {
                        name: "utils",
                        type: "directory",
                        children: [
                            {
                                name: "even_odd.js",
                                type: "file"
                            }
                        ]
                    }
                ]
            },
            {
                name: "README.md",
                type: "file"
            }
        ]
    };

    // Handle node click
    const handleNodeClick = (node) => {
        setSelectedNode(node); // Update the selected node data
    };

    return (
        <div className="flex h-full w-full">
            {/* Pass handleNodeClick to the Graph */}
            <Graph data={fstruct} onNodeClick={handleNodeClick} />
            {/* Pass selectedNode to the InfoSection */}
            <InfoSection selectedNodeData={selectedNode} />
        </div>
    );
}

export default Directory;
