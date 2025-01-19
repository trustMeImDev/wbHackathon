/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import ReactFlow, { Controls, Background } from "@xyflow/reactflow";
import "reactflow/dist/style.css";
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Graph({ data, onNodeClick }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const calculateSubtreeWidth = (data, baseSpacing) => {
        if (!data.children || data.children.length === 0) {
            return baseSpacing; // A single node has a minimum width of `baseSpacing`.
        }
    
        return data.children.reduce((totalWidth, child) => {
            return totalWidth + calculateSubtreeWidth(child, baseSpacing);
        }, 0);
    };
    
    const generateTree = (data, parentId = null, x = 0, y = 0, depth = 1, baseSpacing = 150) => {
        const nodes = [];
        const edges = [];
        const currentId = `${parentId ? `${parentId}-` : ""}${data.name}`;
        const position = { x, y: depth * 150 };
    
        nodes.push({
            id: currentId,
            data: { label: `${data.name} (${data.type})`, ...data },
            position,
            type: data.type,
        });
    
        if (data.children && data.children.length > 0) {
            const totalWidth = calculateSubtreeWidth(data, baseSpacing); // Calculate total width of the subtree.
            let currentX = x - totalWidth / 2; // Start positioning children from the left edge of the subtree.
    
            data.children.forEach((child) => {
                const childWidth = calculateSubtreeWidth(child, baseSpacing);
    
                const childId = `${currentId}-${child.name}`;
                edges.push({
                    id: `e-${currentId}-${childId}`,
                    source: currentId,
                    target: childId,
                });
    
                const { nodes: childNodes, edges: childEdges } = generateTree(
                    child,
                    currentId,
                    currentX + childWidth / 2, // Center the child node within its allocated width.
                    y + 1,
                    depth + 1,
                    baseSpacing
                );
    
                nodes.push(...childNodes);
                edges.push(...childEdges);
    
                currentX += childWidth; // Move to the next sibling's position.
            });
        }
    
        return { nodes, edges };
    };
    
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
                    onNodeClick && onNodeClick(node);
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