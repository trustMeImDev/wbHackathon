/* eslint-disable react/prop-types */
import { Card } from "./ui/card";
import Graph from "@/components/graph"; // Import Graph Component

const InfoSection = ({ selectedNodeData }) => {
    // Sample data for a file-specific flowchart
    const fileSummaryData = {
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

    const fileTextSummary = {
        metrics: {
            "Lines of Code (LOC)": "31",
            "Number of Functions": "1",
            "Classes/Modules": {
                count: "0",
                names: []
            },
            Comments: {
                count: "2",
                percentage: "6.45"
            }
        },
        summary: {
            "Functionality Overview": "This Python code implements the RSA algorithm for encryption and decryption. It calculates the public and private keys based on two prime numbers, encrypts a plaintext message, and then decrypts it back to the original message.",
            Complexity: "The code includes a while loop, a function for calculating the greatest common divisor (GCD), and the use of the power and modulo operations for encryption and decryption. It has a moderate level of complexity."
        }
    };

    return (
        <Card className="flex flex-col w-[30%] h-full p-4 bg-zinc-900 shadow-md border border-zinc-800 rounded-lg">
            <h2 className="text-3xl font-semibold text-center text-white mb-4">
                File Information
            </h2>

            {selectedNodeData ? (
                <NodeDetails selectedNodeData={selectedNodeData} />
            ) : (
                <p className="text-lg text-gray-300 text-center">No node selected.</p>
            )}

            {/* Summary and Metrics Section */}
            <div className="flex flex-col h-[30%] overflow-auto space-y-4 scrollbar-hide mt-4">
                {/* Summary */}
                <Card className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
                    {selectedNodeData?.type === "file" && selectedNodeData?.name === "even_odd.js" ? (
                        <>
                            <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
                            <p className="text-gray-300 text-sm">{fileTextSummary.summary["Functionality Overview"]}</p>
                            <p className="text-gray-300 text-sm mt-2">{fileTextSummary.summary["Complexity"]}</p>
                        </>
                    ) : (
                        <p className="text-center text-gray-300 text-lg">
                            Select a valid file to view the summary.
                        </p>
                    )}
                </Card>

                {/* Metrics */}
                <Card className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
                    {selectedNodeData?.type === "file" && selectedNodeData?.name === "even_odd.js" ? (
                        <>
                            <h3 className="text-lg font-semibold text-white mb-4">Metrics</h3>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                {Object.entries(fileTextSummary.metrics).map(([key, value], index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="font-medium text-white">{key}:</span>
                                        <span className="text-gray-400">
                                            {typeof value === "object"
                                                ? `${value.count} (${value.percentage || "N/A"}%)`
                                                : value}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-center text-gray-300 text-lg">
                            Select a valid file to view the metrics.
                        </p>
                    )}
                </Card>
            </div>

            {/* Flowchart Section */}
            <Card className="flex-grow h-[50%] p-4 bg-zinc-800 border border-zinc-700 rounded-lg mt-4">
                {selectedNodeData?.type === "file" && selectedNodeData?.name === "even_odd.js" ? (
                    <div className="h-full border border-gray-700 rounded-lg flex items-center justify-center">
                        <Graph
                            data={fileSummaryData}
                            onNodeClick={() => {}}
                            style={{
                                height: "100%", // Ensure the graph fills the container
                                width: "100%", // Maintain full width within the border
                            }}
                        />
                    </div>
                ) : (
                    <p className="text-center text-gray-300 text-lg">
                        Select a valid file to view the flowchart.
                    </p>
                )}
            </Card>
        </Card>

    );
};

const NodeDetails = ({ selectedNodeData }) => (
    <div className="h-[200px] overflow-y-auto p-4 bg-zinc-800 border border-zinc-700 rounded-lg scrollbar-hide">
        <p className="text-lg text-gray-300 mb-2">
            Selected <span className="font-bold">{selectedNodeData.type}</span> name:{" "}
            <span className="font-bold text-white"> {selectedNodeData.name}</span>
        </p>

        {selectedNodeData.children?.length > 0 ? (
            <div className="text-lg text-gray-300">
                <p className="mb-2 font-semibold text-white">Children:</p>
                <ul className="pl-4 list-disc space-y-1">
                    {selectedNodeData.children.map((child, index) => (
                        <li key={index} className="text-gray-400">
                            {child.name} (<span className="italic">{child.type}</span>)
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p className="text-md text-gray-400">No children available.</p>
        )}
    </div>
);



export default InfoSection;
