import React from 'react'
import Daxboard from "./Daxboard";
import { Route, Routes } from "react-router-dom";
import Orders from './Orders';
import Prices from './Prices';
import Messages from './Messages';



export default function pages() {
  return (
    <Routes>
      <Route  path="/" element={<Daxboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/prices" element={<Prices />} />
      <Route path="/messages" element={<Messages />} />
     
    </Routes>
  );
}
