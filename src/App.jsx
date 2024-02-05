import React, { useState, useRef, useEffect } from 'react';
import MermaidChart from './components/MermaidChart';
import Controls from './components/Controls';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {

  const [files, setFiles] = useState(['flow1.def', 'flow2.def', 'flow3.def', 'flow4.def']);
  const [currentFile, setCurrentFile] = useState('');
  const [currentChart, setCurrentChart] = useState('');


  const chartContainerRef = useRef(null);

  const [scale, setScale] = useState(1); 

  const loadChart = (fileName) => {
    setCurrentFile(fileName);
    fetch(`./data/${fileName}`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
        setCurrentChart(data);
      })
      .catch(error => console.error('Error loading the chart:', error));
  };

  useEffect(()=>{
    loadChart('flow2.def');
  },[]);

  const zoomIn = () => {
    setScale(scale + 0.1);
  };

  const zoomOut = () => {
    setScale(Math.max(0.1, scale - 0.1));
  };


  const exportChart = () => {
    if (chartContainerRef.current) {
      console.log('exportChart');
      const svg = chartContainerRef.current.querySelector('svg');
      if (svg) {
        const xml = new XMLSerializer().serializeToString(svg);
        const svg64 = btoa(unescape(encodeURIComponent(xml)));
        const b64Start = 'data:image/svg+xml;base64,';
        const image64 = b64Start + svg64;

        const img = new Image();
        img.src = image64;
        img.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = svg.width.baseVal.value;
          canvas.height = svg.height.baseVal.value;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF'; 
          ctx.fillRect(0, 0, canvas.width, canvas.height); 
          ctx.drawImage(img, 0, 0);
          const canvasUrl = canvas.toDataURL("image/png");
          const link = document.createElement('a');
          link.download = 'mermaid-diagram.png';
          link.href = canvasUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      }
    }
  };

  return (
    <div className="container row px-4 px-5 col-12">
      <div className='col-5' style={{ marginTop: '20px' }}>
        <div className="card border-primary mb-3" style={{ maxWidth: '50rem' }}>
          <div className="card-header">流程定義清單</div>
          <div className="card-body text-primary">
            <ul className="list-group">
              {files.map(file => (
                <li key={file} className="list-group-item">
                  <button className='btn btn-default' onClick={() => loadChart(file)}>
                    {file}
                  </button >
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="card border-secondary mb-3" style={{ maxWidth: '50rem' }}>
          <div className="card-header">流程定義</div>
          <div className="card-body text-secondary">
            <h5 className="card-title">{currentFile}</h5>
            <p className="card-text"><pre>{currentChart}</pre></p>
          </div>
        </div>

      </div>
      <div className='col-7'>
        <Controls onZoomIn={zoomIn} onZoomOut={zoomOut} onExport={exportChart} />
        <div
          ref={chartContainerRef}
          className="row chart-container"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0'
          }}
        >
          <MermaidChart key={currentFile} chartDefinition={currentChart} currentFile={currentFile} />
        </div>


      </div>
    </div>
  );
};

export default App;
