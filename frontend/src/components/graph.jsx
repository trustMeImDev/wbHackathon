import React, { useEffect, useState } from "react";
// import ReactFlow, { Controls, Background } from "@xyflow/reactflow";
import "reactflow/dist/style.css";
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Graph({ data, onNodeClick }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    //


    //

    useEffect(() => {
        const { nodes, edges } = generateTree(data);
        setNodes(nodes);
        setEdges(edges);
    }, [data]);

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                colorMode="dark"
                onNodeClick={(event, node) => {
                    onNodeClick && onNodeClick(node.data);
                }}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Graph;