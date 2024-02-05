import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faFileExport } from '@fortawesome/free-solid-svg-icons';

const Controls = ({ onZoomIn, onZoomOut, onExport }) => (
  <div className="my-3">
    <button className="btn btn-primary mx-1" onClick={onZoomIn}>
      <FontAwesomeIcon icon={faSearchPlus} />
    </button>
    <button className="btn btn-primary mx-1" onClick={onZoomOut}>
      <FontAwesomeIcon icon={faSearchMinus} />
    </button>
    <button className="btn btn-primary mx-1" onClick={onExport}>
      <FontAwesomeIcon icon={faFileExport} />
    </button>
  </div>
);

export default Controls;
