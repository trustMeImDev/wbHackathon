/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Graph from "@/components/graph"; 
import Cookies from "js-cookie";


const InfoSection = ({ selectedNodeData, file_path, repo_url }) => {
    const fetchCodeSummary = async (file_path, repo_url) => {
        console.log(file_path);
        console.log(repo_url)
        const token = Cookies.get("authToken");
        try {
            const response = await fetch("http://127.0.0.1:5000/code-summary", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ file_path, repo_url }),
              });
    
            if (!response.ok) {
                throw new Error("Failed to fetch code summary");
            }
    
            const summaryData = await response.json();
            return summaryData;
        } catch (error) {
            console.error("Error fetching code summary:", error);
            throw error; 
        }
    };
    const [fileTextSummary, setFileTextSummary] = useState(null);
    
    // fetching summary
    useEffect(() => {
        if (selectedNodeData?.type === "file") {
            fetchCodeSummary(Cookies.get("authToken"), file_path, repo_url)
                .then((data) => setFileTextSummary(data))
                .catch((error) => console.error("Error fetching file summary:", error));
        }
    }, [selectedNodeData]);

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

    return (
        <Card className="flex flex-col w-[30%] h-full p-4 bg-zinc-900 shadow-md border border-zinc-800 rounded-lg">
            <h2 className="text-3xl font-semibold text-center text-white mb-4">
                Flowchart Information
            </h2>

            {selectedNodeData ? (
                <NodeDetails selectedNodeData={selectedNodeData} />
            ) : (
                <p className="text-lg text-gray-300 text-center">No node selected.</p>
            )}

            {selectedNodeData?.type === "file" && (
                <>
                    {/* Summary Section */}
                    <div className="mt-4 mb-2 overflow-auto scrollbar-hide">
                        <Card className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg mb-4">
                            {fileTextSummary && selectedNodeData?.name === "even_odd.js" ? (
                                <>
                                    <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
                                    <p className="text-gray-300 text-sm">
                                        {fileTextSummary.summary["Functionality Overview"]}
                                    </p>
                                    <p className="text-gray-300 text-sm mt-2">
                                        {fileTextSummary.summary["Complexity"]}
                                    </p>
                                </>
                            ) : (
                                <p className="text-center text-gray-300 text-lg">
                                    Select a valid file to view the summary.
                                </p>
                            )}
                        </Card>

                        {/* Metrics Section */}
                        <Card className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg mb-2">
                            {fileTextSummary && selectedNodeData?.name === "even_odd.js" ? (
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
                    <div className="flex flex-col mt-auto h-[50%]">
                        <Card className="flex-grow p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
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
                    </div>
                </>
            )}
        </Card>
    );
};

const NodeDetails = ({ selectedNodeData }) => (
    <div>
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
