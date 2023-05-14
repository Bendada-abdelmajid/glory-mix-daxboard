import React, {useContext} from "react";
import { NavLink , Link} from "react-router-dom";
import { CiGrid42,} from "react-icons/ci";

import { FaPlus } from 'react-icons/fa';

import {  TbUsers} from "react-icons/tb";
import {AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai'


import {IoMdPricetag} from 'react-icons/io'
import { BsEnvelope, BsFacebook, BsInstagram, BsPaypal} from "react-icons/bs";
import { AdminContext } from "../AdminContext";
export default function NaveBar({setNavState, links}) {
  const {setOpenPriForm}= useContext(AdminContext)
  

  return (
    <>
    <div className="overlay nav_overlay" onClick={()=>{setNavState(false)}}></div>
    <div className="nav-placholder"></div>
    <nav >
    <NavLink className="logo f-start" to={"/"}>
          <div className="logo-img">
            <img src="/logo.svg"/>
          </div>
          <span>Glory Mix</span>
        </NavLink>
      <div className="space-b scrollY">
        <div>
        
        <div className="nav-link center nav-add" onClick={()=>setOpenPriForm({open:true, item:null})}>
          <FaPlus/>
          <span className="space-b">Add Account</span>
        </div>
        <NavLink className="nav-link f-start" to={"/"}>
        <CiGrid42/>
          <span>Daxboard</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/orders"}>
          <TbUsers/>
          <span>Users</span>
        </NavLink>
        
        <NavLink className="nav-link f-start"  to={"/prices"}>
          <IoMdPricetag/>
          <span>Prices</span>
        </NavLink>
        <NavLink className="nav-link f-start"  to={"/Messages"}>
          <AiOutlineMessage/>
          <span>Messages</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/hhh"}>
          <BsPaypal/>
          <span>Paypal</span>
        </NavLink>
        
        
          <p>socail medai</p>
        <Link className="nav-link f-start" to={links.facebook}>
          <BsFacebook/>
          <span>Facebook</span>
        </Link>
        <Link className="nav-link f-start" to={links.instagrame}>
          <BsInstagram/>
          <span>Instagrame</span>
        </Link>
        <Link className="nav-link f-start" to={links.Gmail}>
          <BsEnvelope/>
          <span>Gmail</span>
        </Link>
        </div>
        <div className="nav-link f-start" >
          <AiOutlineLogout/>
          <span>LogOut</span>
        </div>
        </div>

        
    </nav>
  </>
  );
}
