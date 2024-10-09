import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import Home from './pages/Home';
import Bill from './pages/Bill';
import Billdetail from './pages/Billdetail';
import Newbill from './newbill';
import Editbill from './pages/editbill';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index path="/" element={<Home/>}/>
        <Route path="/bill" element={<Bill/>}/>
        <Route path='/billdetail/:id' element={<Billdetail/>}/>
        <Route path="/newbill" element={<Newbill/>}/>
        <Route path="/editbill/:id" element={<Editbill/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

