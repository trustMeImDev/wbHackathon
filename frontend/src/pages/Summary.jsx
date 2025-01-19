/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Graph from '@/components/graph'
import { Info } from '@/components/info-section'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Summary() {


    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const repo = params.get('repo');
    
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const repoData = localStorage.getItem(repo);
                const parsedData = await JSON.parse(repoData);
                console.log(parsedData)
                if (repoData) {
                    setData(parsedData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (repo) {
            fetchData();
        }
    }, []);


    // const data = {
    //     "name": "root",
    //     "type": "directory",
    //     "children": [
    //         {
    //             "name": "frontend",
    //             "type": "directory",
    //             "children": [
    //                 {
    //                     "name": "package.json",
    //                     "type": "file"
    //                 },
    //                 {
    //                     "name": "src",
    //                     "type": "directory",
    //                     "children": [
    //                         {
    //                             "name": "App.js",
    //                             "type": "file"
    //                         },
    //                         {
    //                             "name": "components",
    //                             "type": "directory",
    //                             "children": [
    //                                 {
    //                                     "name": "graph.jsx",
    //                                     "type": "file"
    //                                 },
    //                                 {
    //                                     "name": "info-section.jsx",
    //                                     "type": "file"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             "name": "backend",
    //             "type": "directory",
    //             "children": [
    //                 {
    //                     "name": "Dockerfile",
    //                     "type": "file"
    //                 },
    //                 {
    //                     "name": "server.js",
    //                     "type": "file"
    //                 }
    //             ]
    //         }
    //     ]
    // }

    return (
        <div className='flex h-full w-full'>
            {
                data ? <Graph data={data} /> : <div>Loading...</div>
            }
            <Info selectedNodeData={data} />
        </div>
    )
}

export default Summary;