import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContentManager from './components/ContentManager';
import Blog from './components/Blog';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<ContentManager />} />
        <Route path="/" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
