/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FunctionGraph from "./function-graph";
import { Card } from "./ui/card";
import Graph from "@/components/graph";
import Cookies from "js-cookie";

const InfoSection = ({ fileTextSummary, selectedNodeData, fileSummaryData, repo_url, pathUrl }) => {

    
    const [flowchartData, setFlowchartData] = useState(null);
    const [selectedFunction, setFunction] = useState(null);
    
    useEffect(() => {
        console.log(fileSummaryData, fileTextSummary, selectedNodeData);
    }, [fileTextSummary, selectedNodeData, fileSummaryData, flowchartData]);
    const handleClick = async (val) => {
        setFunction(val);
        const authToken = Cookies.get("authToken");
        const functionData = await fetch("http://127.0.0.1:5000/code-flow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ function_name: val, repo_url, file_path: pathUrl }),
        });
        const functionDataJson = await functionData.json();
        setFlowchartData(functionDataJson);
    }

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

                            {fileSummaryData ? (
                                <>
                                    <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
                                    <p className="text-gray-300 text-sm">
                                        <strong>Functionality Overview:</strong> {fileSummaryData.summary?.["Functionality Overview"] || "N/A"}
                                    </p>
                                    <p className="text-gray-300 text-sm mt-2">
                                        <strong>Complexity:</strong> {fileSummaryData.summary?.Complexity || "N/A"}
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
                            {fileSummaryData && fileSummaryData.metrics ? (
                                <>
                                    <h3 className="text-lg font-semibold text-white mb-4">Metrics</h3>
                                    <ul className="space-y-3 text-gray-300 text-sm">
                                        {Object.entries(fileSummaryData.metrics).map(([key, value], index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span className="font-medium text-white">{key}:</span>
                                                <span className="text-gray-400">
                                                    {typeof value === "object"
                                                        ? `Count: ${value.count} (${value.percentage || "N/A"}%)`
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


                    {/* Functions Section */}
                    {fileSummaryData && fileSummaryData.metrics && fileSummaryData.metrics.Functions && (
                        <Card className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg mb-2">
                            <h3 className="text-lg font-semibold text-white mb-4">Functions</h3>
                            <select
                                className="w-full p-2 bg-zinc-700 text-white rounded-lg"
                                onChange={(e) => handleClick(e.target.value)}
                            >
                                {fileSummaryData.metrics.Functions.map((func, index) => (
                                    <option key={index} value={func}>
                                        {func}
                                    </option>
                                ))}
                            </select>
                        </Card>
                    )}

                    {/* Flowchart Section */}
                    <div className="flex flex-col mt-auto h-[50%]">
                        <Card className="flex-grow p-4 bg-zinc-800 border border-zinc-700 rounded-lg">

                            <div className="h-full border border-gray-700 rounded-lg flex items-center justify-center">
                                {
                                    flowchartData ? (

                                        <FunctionGraph
                                            data={flowchartData} // Pass fetched flowchart data
                                            onNodeClick={() => { }}
                                            style={{
                                                height: "100%", // Ensure the graph fills the container
                                                width: "100%", // Maintain full width within the border
                                            }}
                                        />
                                    ) : (
                                        <p className="text-gray-300 text-lg">Loading...</p>
                                    )
                                }
                            </div>

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
            Selected <span className="font-bold">{selectedNodeData.type}</span> name:{selectedNodeData?.data?.label || ""}
            <span className="font-bold text-white"> {selectedNodeData.name}</span>
        </p>

        {selectedNodeData?.data?.children?.length > 0 ? (
            <div className="text-lg text-gray-300">
                <p className="mb-2 font-semibold text-white">Children:</p>
                <ul className="pl-4 list-disc space-y-1">
                    {selectedNodeData.data.children.map((child, index) => (
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
