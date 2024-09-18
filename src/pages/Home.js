import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './Home.css';

const socket = io('http://localhost:5000');

const Home = () => {
  const initialGrid = Array.from({ length: 28 }, () => Array(28).fill(0));
  const [grid, setGrid] = useState(initialGrid);
  const navigate = useNavigate();

  const incrementGrid = (row, col) => {
    const incrementValue = 153; // 60% of 255
    const updatedGrid = grid.map((gridRow, rowIndex) =>
      gridRow.map((cell, colIndex) => {
        const distance = Math.max(Math.abs(rowIndex - row), Math.abs(colIndex - col));
        if (distance === 0) {
          return Math.min(cell + incrementValue, 255);
        } else if (distance === 1) {
          return Math.min(cell + incrementValue, 255);
        } else {
          return cell;
        }
      })
    );
    setGrid(updatedGrid);
  };

  const handleCellClick = (row, col) => {
    incrementGrid(row, col);
  };

  const handleSend = () => {
    socket.emit('update_grid', grid);
    navigate('/filter', { state: { grid } });
  };

  const handleReset = () => {
    setGrid(initialGrid);
  };

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data.message);
    });

    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">28x28 MNIST Drawing Grid</h1>

      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="grid-cell"
              style={{ backgroundColor: `rgb(${cell}, ${cell}, ${cell})` }}
              onMouseDown={() => handleCellClick(rowIndex, colIndex)}
              onMouseOver={(e) => {
                if (e.buttons === 1) {
                  handleCellClick(rowIndex, colIndex);
                }
              }}
            />
          ))
        ))}
      </div>

      <div className="button-container">
        <button className="send-button" onClick={handleSend}>
          Send and View Filters
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Home;
