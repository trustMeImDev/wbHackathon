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