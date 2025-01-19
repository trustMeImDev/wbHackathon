/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import ReactFlow, { Controls, Background } from "@xyflow/reactflow";
import "reactflow/dist/style.css";
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function FunctionGraph({ data }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    // Function to generate unique IDs
    const generateId = (() => {
        let id = 0;
        return () => `node_${id++}`;
    })();

    // Function to generate nodes and edges dynamically
    function generateReactFlowTree(json) {
        const nodes = [];
        const edges = [];
        let yOffset = 100; // Y-offset to position nodes vertically

        // Add the origin node
        const originId = generateId();
        nodes.push({
            id: originId,
            data: {
                label: 'Origin',
            },
            position: { x: 0, y: 0 },
        });

        // Recursive helper function
        function traverseStep(step, parentId = originId, depth = 0) {
            const stepId = generateId();

            // Create a node based on the step type
            const node = {
                id: stepId,
                data: {
                    label: step.description || step.condition || step.action,
                    type: step.type,
                },
                position: { x: depth * 200, y: yOffset }, // Position nodes horizontally by depth and vertically by yOffset
            };
            nodes.push(node);

            // Increment yOffset for the next node
            yOffset += 100;

            // Add an edge connecting this node to its parent
            if (parentId) {
                edges.push({
                    id: `${parentId}-${stepId}`,
                    source: parentId,
                    target: stepId,
                    animated: true,
                });
            }

            // Handle children recursively
            if (step.children) {
                step.children.forEach((child) => traverseStep(child, stepId, depth + 1));
            }

            // Handle branches for if statements
            if (step.branches) {
                step.branches.forEach((branch) => {
                    const branchId = generateId();

                    // Create a branch node
                    const branchNode = {
                        id: branchId,
                        data: {
                            label: branch.action,
                            branch: branch.branch,
                            stateChange: branch.state_change,
                        },
                        position: { x: (depth + 1) * 200, y: yOffset },
                    };
                    nodes.push(branchNode);

                    // Increment yOffset for the next node
                    yOffset += 100;

                    // Connect branch node to its parent
                    edges.push({
                        id: `${stepId}-${branchId}`,
                        source: stepId,
                        target: branchId,
                        animated: true,
                    });
                });
            }
        }

        // Traverse the JSON steps
        json.steps.forEach((step) => traverseStep(step));

        return { nodes, edges };
    }




    useEffect(() => {
        const { nodes, edges } = generateReactFlowTree(data);
        setNodes(nodes);
        setEdges(edges);
    }, [data]);

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                colorMode="dark"
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default FunctionGraph;