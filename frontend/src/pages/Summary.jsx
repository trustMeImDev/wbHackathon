/* eslint-disable no-unused-vars */
import Graph from '@/components/graph'
import { Info } from '@/components/info-section'
import React from 'react'

function Summary() {

    const data = {
        "name": "root",
        "type": "directory",
        "children": [
            {
                "name": "frontend",
                "type": "directory",
                "children": [
                    {
                        "name": "package.json",
                        "type": "file"
                    }
                ]
            },
            {
                "name": "backend",
                "type": "directory",
                "children": [
                    {
                        "name": "Dockerfile",
                        "type": "file"
                    },
                    {
                        "name": "server.js",
                        "type": "file"
                    }
                ]
            }
        ]
    }

    return (
        <div className='flex h-full w-full'>
            <Graph data={data} />
            <Info selectedNodeData={data} />
        </div>
    )
}

export default Summary;