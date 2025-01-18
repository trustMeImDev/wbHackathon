import Graph from '@/components/graph';
import { useState } from 'react';
import { Info } from '@/components/info-section';

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

    const handleNodeClick = (nodeData) => {
        setSelectedNodeData(nodeData);
    };

    return (
        <div className="flex h-full w-full">
            <Graph data={data} onNodeClick={handleNodeClick} />
            <Info selectedNodeData={selectedNodeData} />
        </div>
    );
}

export default FileSummary;
