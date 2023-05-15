import "./App.css";

import React, { useState, useEffect, lazy, Suspense } from "react";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from './FirebaseConfig'
import Loader from "./pages/Loader";

const Admin = lazy(() => import('./pages/Admin'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
function App() {
  const navigate= useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState({});
  const [dark,setDark ] = useState(
    JSON.parse(localStorage.getItem("daxboardTheme")) || false
  );
  const location = useLocation();
  useEffect(() => {
    try {
      const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
        console.log(user)
      
        if (user && user.uid === "kXSdDhl3CveATP2nBgvfPSrt4n03") {
          setUser(user);
          if(location.pathname === "/login"){
            navigate("/")
          }
           
        } else {
         navigate("/login")
        }
      });
      const unsub = onSnapshot(doc(db, "admin", "admin"), (doc) => {
        setLinks(doc.data());
      });
      return () => {
        unregisterAuthObserver();
        unsub();
      };
    } catch (error) {
      alert("no connection");
    }
  }, []);

  return (
    
      <div className={`App ${dark ? "dark" :""} `}>
        <Suspense fallback={<Loader/>}>
      <Routes>
          <Route  path="/" element={<Admin user={user} setUser={setUser} links={links} setDark={setDark} dark={dark}/>}>
          <Route  path="/"  />
          <Route path="/orders"  />
          <Route path="/prices"  />
          <Route path="/messages"  />
          </Route>
          <Route  path="/login" element={<Login />} />
          <Route path="*"element={<NotFound/> }/>
      </Routes>
      </Suspense>
      </div>
   
    
  );
}

export default App;
