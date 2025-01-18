/* eslint-disable react/prop-types */
import { Card } from "./ui/card";

export const Info = ({ selectedNodeData }) => {
    return (
        <Card className="flex flex-col w-[30%] h-full p-4 bg-zinc-900">
            <p className="text-3xl text-center mb-4">Flowchart Information</p>
            {selectedNodeData ? (
                <>
                    <div className="text-xl mb-4">
                        Selected {selectedNodeData.type} name: <span className="font-bold">{selectedNodeData.name}</span>
                    </div>
                    {selectedNodeData.children.length > 0 ? (
                        <div className="text-lg">
                            <p className="mb-2">Children:</p>
                            <ul className="pl-4 list-disc">
                                {selectedNodeData.children.map((child, index) => (
                                    <li key={index}>
                                        {child.name} ({child.type})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-lg">No children available.</p>
                    )}
                </>
            ) : (
                <div className="text-lg">
                    <p className="mb-4 font-bold">Summary of Even-Odd Function:</p>
                    <p>
                    The even-odd function is designed to check whether a given number is even or odd. It takes a single integer as input and checks if the number is divisible by 2. If the number is divisible by 2, it is classified as "Even"; otherwise, it is classified as "Odd". The function then outputs a message indicating whether the number is even or odd.
                    </p>
                </div>
            )}
        </Card>
    );
};
