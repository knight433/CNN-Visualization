import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Filter from './pages/Filter';  // Import the new Filter page

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filter" element={<Filter />} />  {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
