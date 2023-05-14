import React  from "react";
import { google, auth } from '../FirebaseConfig';

import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom"

function Login() {
 
  const navigate= useNavigate()
     
  const login = async() => {
    try {
      const result = await signInWithPopup(auth, google) 
      if(result.user.getIdTokenResult().claims.admin) {
        alert('hi ouner')
        navigate("/")
      } else {
        alert('you are not allowd to be here')
      }
    } catch(err) {
      console.log(err)
    }
    
  }
  return (
    <div className="login ">
      <img src="/logo.svg"/> 
          <h3>Welcome to GloryMix</h3>
          <p>Log in with your google account to continue</p>
       
       
          <button onClick={login}>
            Login
          </button>
      
      
     
    </div>
  );
}

export default Login;
