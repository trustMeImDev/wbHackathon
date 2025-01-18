/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';

function Graph({ data }) {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    let nodeCounter = 0;

    const createGraph = (data, parentId = null, x = 0, y = 0, depth = 1) => {
        const nodes = [];
        const edges = [];
        const currentId = `${parentId ? `${parentId}-` : ""}${data.name}`;
        const position = { x: x * 200, y: depth * 100 };
      
        // Add the current node
        nodes.push({
          id: currentId,
          data: { label: `${data.name} (${data.type})` },
          position,
          type: "default",
        });
      
        // Add edges and traverse children if it's a directory
        if (data.type === "directory" && data.children) {
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
        console.log(nodes);
        console.log(edges)
        setNodes(nodes);
        setEdges(edges);
    }, []);

    return (
        <div className='w-[70%] h-full'>
            <ReactFlow nodes={nodes} edges={edges} colorMode='dark'>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Graph;