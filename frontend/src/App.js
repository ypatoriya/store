import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../src/components/Login';
import AllProduct from '../src/components/AllProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/allProducts" element={<AllProduct />} />
    </Routes>
  );
}

export default App; 