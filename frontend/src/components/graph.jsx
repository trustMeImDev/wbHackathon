import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';

function Graph({ data, onNodeClick }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const generateTree = (data, parentId = null, x = 0, y = 0, depth = 1, baseSpacing = 150) => {
        const nodes = [];
        const edges = [];
        const currentId = `${parentId ? `${parentId}-` : ""}${data.name}`;
        const position = { x, y: depth * 150 };

        // Creating the node with the appropriate label and type
        nodes.push({
            id: currentId,
            data: { label: `${data.name} (${data.type})`, ...data },
            position,
            type: "default",
        });

        // If the node has children, create edges and sub-nodes for them
        if (data.children && data.children.length > 0) {
            const totalChildren = data.children.length;
            const halfWidth = (totalChildren - 1) * baseSpacing * 0.5;

            data.children.forEach((child, index) => {
                const childX = x - halfWidth + index * baseSpacing;
                const childId = `${currentId}-${child.name}`;

                edges.push({
                    id: `e-${currentId}-${childId}`,
                    source: currentId,
                    target: childId,
                });

                const { nodes: childNodes, edges: childEdges } = generateTree(
                    child,
                    currentId,
                    childX,
                    y + 1,
                    depth + 1,
                    baseSpacing
                );

                nodes.push(...childNodes);
                edges.push(...childEdges);
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
        <div className="w-[70%] h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                colorMode="dark"
                onNodeClick={(event, node) => {
                    onNodeClick && onNodeClick(node.data); // Pass node data to the handler
                }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Graph;
