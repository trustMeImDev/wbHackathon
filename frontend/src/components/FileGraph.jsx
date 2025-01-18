/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';

function FileGraph({ data }) {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    let nodeCounter = 0;

    const generateTree = (data, parentId = null, x = 0, y = 0, depth = 1, baseSpacing = 150) => {
      const nodes = [];
      const edges = [];
    
      // Generate a unique ID for the current node
      const currentId = `${parentId ? `${parentId}-` : ""}${data.name}`;
      const position = { x, y: depth * 150 }; // Vertical spacing based on depth
    
      // Add the current node
      nodes.push({
        id: currentId,
        data: { label: `${data.name} (${data.type})` },
        position,
        type: "default",
      });
    
      // Process children if it's a loop or condition (while or if)
      if (data.type === "while" || data.type === "if") {
        data.children.forEach((child) => {
          const childX = x + 200; // Space out horizontally for each condition or loop
          const childId = `${currentId}-${child.name}`;
    
          // Add an edge from the current node to the child
          edges.push({
            id: `e-${currentId}-${childId}`,
            source: currentId,
            target: childId,
          });
    
          // Recursively generate the tree for the child
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
        console.log(nodes);
        console.log(edges)
        setNodes(nodes);
        setEdges(edges);
    }, [data]);

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
