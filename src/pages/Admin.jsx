import React, {useState, useEffect, Suspense} from 'react'
import Header from "../components/Header";
import NaveBar from "../components/NaveBar";
import AdminePages from "./pages";


import { AdminContext } from '../AdminContext';
import Settings from '../components/Settings';

import CompletOrder from '../components/CompletOrder';
import PriceForm from '../components/PriceForm';
export default function Admin({user, setUser, links, setDark, dark}) {
    require("./admin.css")
    const [openPriForm, setOpenPriForm] = useState({ open: false, item: null });
    
    const [openSettForm, setOpenSettForm] = useState(false);
    
    const [navState, setNavState] = useState(false);
    const [openCompletForm, setOpenCompletForm ]= useState(null)
  
  return (
    <div className={`admin  ${navState ? "active_nav" : ""}`}>

        
        <AdminContext.Provider
        value={{
          openPriForm, setOpenPriForm,
        
          openCompletForm, setOpenCompletForm ,
        }}
      >
        
      
        <NaveBar setNavState={setNavState} links={links}/>
        <div className="page-cont">
          <Header navState={navState} setNavState={setNavState} user={user} setUser={setUser} setOpenSettForm={setOpenSettForm}   dark={dark}
          setDark={setDark}/>
     
          <Suspense fallback={<h1>loding ...</h1>}>
            <AdminePages />
          </Suspense>
      
        </div>
        <PriceForm />
        <Settings openSettForm={openSettForm} setOpenSettForm={setOpenSettForm} links={links}/>

        
        <CompletOrder/>
        </AdminContext.Provider>
    </div>
  )
}
