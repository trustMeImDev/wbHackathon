import Graph from '@/components/graph'
import React from 'react'

function FileSummary() {

    const data = {
        "name": "even_odd",
        "type": "function",
        "children": [
          {
            "name": "while count < 5",
            "type": "while",
            "children": [
              {
                "name": "if count % 2 == 0",
                "type": "if",
                "children": []
              },
              {
                "name": "else",
                "type": "if",
                "children": []
              }
            ]
          }
        ]
      }

    return (
        <div className='flex h-full w-full'>
            <Graph data={data} />
        </div>
    )
}

export default FileSummary;
