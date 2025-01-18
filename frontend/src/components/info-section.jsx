/* eslint-disable react/prop-types */

import { Card } from "./ui/card"

export const Info = ({ selectedNodeData }) => {
    return (
        <Card className="flex flex-col w-[30%] h-full p-4 bg-zinc-900">
            {
                selectedNodeData && (
                    <>
                        <p className="text-3xl text-center mb-4">Node Information</p>
                        <div className="flex justify-between">
                            <div className="text-xl">Selected {selectedNodeData.type} name: <span className="font-bold">{selectedNodeData.name}</span></div>
                        </div>
                        <div className="text-xl">
                            {selectedNodeData.children.map((child, index) => {
                                return (
                                    <ul key={index} className="">
                                        <li>{child.name}</li>
                                        <li>{child.type}</li>
                                    </ul>
                                )
                            })}
                        </div>
                    </>
                )
            }
        </Card>
    )
}
