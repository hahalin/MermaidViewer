import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import mermaid from 'mermaid';

const MermaidChart = ({ chartDefinition, currentFile }) => {

    const chartRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true
        });

    }, []);

    useEffect(() => {
        setLoading(true);
        console.log('currentFile change');
        setTimeout(() => {
            setLoading(false);
            mermaid.contentLoaded();
            
        }, 100);
    }, [currentFile]);

    return (
        <>
            {loading && <div>loading...</div>}

            <div className="mermaid">{chartDefinition}</div>
        </>
    );

};


export default MermaidChart;
