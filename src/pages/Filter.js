// src/pages/Filter.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '../components/Grid';  // Import the Grid component
import './Filter.css';  // Optional, for additional Filter page styling
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Filter = () => {
  const location = useLocation();
  const { grid } = location.state;  // Access the passed grid data
  const [receivedGrid, setReceivedGrid] = useState(null);  // State to store the received grid data

  const handleLayerChange = (layer, isFilter) => {
    socket.emit('get_layer', layer, isFilter);
  };

  useEffect(() => {
    socket.on('layer_data', (data) => {
      console.log('Received layer data:', data);  // Add logging to debug data
      const { filters, filter_shape } = data;

      // Assuming filters is a flat array that needs to be reshaped
      const [num_filters, filter_height, filter_width, num_channels] = filter_shape;
      const reshapedGrid = new Array(num_filters * filter_height * filter_width * num_channels).fill(0);
      filters.flat().forEach((item, index) => {
        reshapedGrid[index] = item;
      });

      setReceivedGrid(reshapedGrid);
    });

    return () => {
      socket.off('layer_data');
    };
  }, []);

  return (
    <div className="filter-container">
      <h1 className="filter-title">28x28 Grid with Numbers</h1>
      
      <div className="grid-buttons-container">
        <Grid grid={grid} />
        
        <div className="layer-buttons">
          <button onClick={() => handleLayerChange('conv2d_1', 1)}>conv2d 1</button>
          <button onClick={() => handleLayerChange('max_pooling_1', 1)}>max_pooling 1</button>
          <button onClick={() => handleLayerChange('conv2d_2', 1)}>conv2d 2</button>
          <button onClick={() => handleLayerChange('max_pooling_2', 1)}>max_pooling 2</button>
          <button onClick={() => handleLayerChange('conv', 1)}>conv</button>
        </div>
      </div>
      
      {receivedGrid && (
        <div className="received-grid-container">
          <h2>Received Grid</h2>
          <Grid grid={receivedGrid} />
        </div>
      )}
    </div>
  );
};

export default Filter;
