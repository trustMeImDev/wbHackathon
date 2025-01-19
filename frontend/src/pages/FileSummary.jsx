import React, { useState } from "react";
import Graph from "@/components/graph";
import InfoSection from "@/components/info-section"; // Correct
    
function FileSummary() {
    const [selectedNodeData, setSelectedNodeData] = useState(null);

    const data = {
        name: "even_odd",
        type: "function",
        children: [
            {
                name: "while count < 5",
                type: "while",
                children: [
                    { name: "if count % 2 == 0", type: "if", children: [] },
                    { name: "else", type: "if", children: [] }
                ]
            }
        ]
    };

    const handleNodeClick = (node) => {
        setSelectedNodeData(node);
    };

    return (
        <div className="flex h-full w-full">
            <Graph data={data} onNodeClick={handleNodeClick} />
            <InfoSection selectedNodeData={selectedNodeData} />
        </div>
    );
}

export default FileSummary;
