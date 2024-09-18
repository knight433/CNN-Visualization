import React from 'react';
import './Grid.css';

const Grid = ({ grid }) => {
  if (!grid) {
    return <div>No grid data available</div>;
  }

  const gridSize = Math.sqrt(grid.length);
  
  if (gridSize % 1 !== 0) {
    return <div>Invalid grid data</div>;
  }

  // Create grid rows
  const rows = [];
  for (let i = 0; i < gridSize; i++) {
    const row = grid.slice(i * gridSize, (i + 1) * gridSize);
    rows.push(row);
  }

  return (
    <div className="grid">
      {rows.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div className="grid-cell" key={cellIndex} style={{ backgroundColor: `rgba(0, 0, 0, ${cell})` }}>
              {/* You can also add additional content or styling here */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
