/* eslint-disable react/prop-types */
import FunctionGraph from "./function-graph";
import { Card } from "./ui/card";

const InfoSection = ({ selectedNodeData }) => {
    // Sample data for a file-specific flowchart
    const fileSummaryData = {
        "function_name": "reset_board",
        "steps": [
          {
            "children": [
              {
                "branches": [
                  {
                    "action": "Remove the 'starting_pos' class from the current child node",
                    "branch": "true",
                    "state_change": "Class 'starting_pos' removed from the element"
                  },
                  {
                    "action": "Skip the removal of 'starting_pos' class",
                    "branch": "false",
                    "state_change": "No state change"
                  }
                ],
                "condition": "chessboard.childNodes[i].classList.contains('starting_pos')",
                "description": "Check if the current child node has the 'starting_pos' class",
                "type": "if_statement"
              },
              {
                "branches": [
                  {
                    "action": "Remove the 'ending_pos' class from the current child node",
                    "branch": "true",
                    "state_change": "Class 'ending_pos' removed from the element"
                  },
                  {
                    "action": "Skip the removal of 'ending_pos' class",
                    "branch": "false",
                    "state_change": "No state change"
                  }
                ],
                "condition": "chessboard.childNodes[i].classList.contains('ending_pos')",
                "description": "Check if the current child node has the 'ending_pos' class",
                "type": "if_statement"
              }
            ],
            "condition": "i < chessboard.childNodes.length",
            "description": "Iterate through all child nodes of the chessboard",
            "type": "loop"
          },
          {
            "children": [
              {
                "description": "Remove the 'highlighted' class from the current move",
                "type": "operation"
              }
            ],
            "condition": "i < moves.length",
            "description": "Iterate through all moves in the 'moves' array",
            "type": "loop"
          }
        ]
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

    <div className="flex flex-col mt-auto h-[50%]">
        <Card className="flex-grow p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
            {/* Render the FileSummary graph dynamically */}
            {selectedNodeData?.name === "even_odd.js" ? (
                <div className="h-full border border-gray-700 rounded-lg flex items-center justify-center">
                    <FunctionGraph
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
                    The flowchart goes here.
                </p>
            )}
        </Card>
    </div>
</Card>


    );
};

const NodeDetails = ({ selectedNodeData }) => (
    <div>
        <p className="text-xl text-gray-300 mb-4">
            Selected <span className="font-bold">{selectedNodeData.type}</span> name: 
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
            <p className="text-lg text-gray-400">No children available.</p>
        )}
    </div>
);

export default InfoSection;
