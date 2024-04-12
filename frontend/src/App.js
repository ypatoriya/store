import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../src/components/Login';
import AllProduct from '../src/components/AllProduct';
import AddProduct from '../src/components/AddProduct';
import Search from './components/Search';
import AddCategory from './components/AddCategory';
import EditProduct from './components/EditProduct';
import AddUser from './components/AddUser';
import Category from './components/Category';
import Editcategory from './components/Editcategory';
import Email from './components/Email';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/allProducts" element={<AllProduct />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/search" element={<Search />} />
      <Route path="/addCategory" element={<AddCategory />} />
      <Route path="/editProduct/:id" element={<EditProduct />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path='/category' element={<Category />} />
      <Route path='/editcategory/:id' element={<Editcategory />} />
      <Route path='/email' element={<Email />} />
    </Routes>
  );
}

export default App; 