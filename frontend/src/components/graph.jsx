/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import ReactFlow, { Controls, Background } from "@xyflow/reactflow";
import "reactflow/dist/style.css";
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Graph({ data, onNodeClick }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const createGraph = (data, parentId = null, x = 0, y = 0, depth = 1) => {
        console.log(data)
        const nodes = [];
        const edges = [];
        const currentId = `${parentId ? `${parentId}-` : ""}${data.name}`;
        const position = { x: x * 200, y: depth * 100 };

        nodes.push({
            id: currentId,
            data: { label: `${data.name} (${data.type})` },
            position,
            type: "default",
        });

        if (data.children && data.children.length > 0) {
            const totalChildren = data.children.length;
            const halfWidth = (totalChildren - 1) * baseSpacing * 0.5;

            data.children.forEach((child, index) => {
                const childId = `${currentId}-${child.name}`;
                edges.push({ id: `e-${childId}`, source: currentId, target: childId });
                const { nodes: childNodes, edges: childEdges } = createGraph(child, currentId, index, y + 1, depth + 1);
                nodes.push(...childNodes);
                edges.push(...childEdges);
            });
        }
        return { nodes, edges };
    };

    useEffect(() => {
        const { nodes, edges } = createGraph(data);
        setNodes(nodes);
        setEdges(edges);
    }, []);

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                colorMode="dark"
                onNodeClick={(event, node) => {
                    onNodeClick && onNodeClick(node.data);
                }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Graph;
