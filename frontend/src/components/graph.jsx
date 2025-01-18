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
    
      // Process children if it's a directory
      if (data.type === "directory" && data.children) {
        const totalChildren = data.children.length;
        const depthFactor = baseSpacing * depth; // Increase spacing by depth
    
        // Calculate the total width occupied by siblings
        const halfWidth = (totalChildren - 1) * depthFactor * 0.5;
    
        data.children.forEach((child, index) => {
          // Calculate the horizontal position of the child node
          const childX = x - halfWidth + index * depthFactor * 1.1; // Spread siblings using depthFactor
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