import React, {useState, useEffect} from "react";
import { BiArrowBack, BiSupport} from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { db } from "../FirebaseConfig";
import {collection, onSnapshot, query, where, addDoc, updateDoc, doc} from "firebase/firestore";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


export default function Messages() {
  const [messages, setMessages]= useState([]);
  const [users, setUsers]= useState([]);
  const [open, setOpen]= useState(null)
  const [message, setMessage] = useState("");
  useEffect(() => {
     const unsubscribe = onSnapshot(
       collection(db, "users"),
       (querySnapshot) => {
         const list = [];
         querySnapshot.forEach((doc) => {
           list.push({ id: doc.id, ...doc.data()});
         });
    
         setUsers(list);
       
      
       },
       (error) => {
         console.log(error);
       }
     );
     
     return ()=>{
      
       unsubscribe();
     }
    
 
   }, [])
   useEffect(() => {
   
     if(open) {
  
      const unsubscribe = onSnapshot( query(
        collection(db, "messages"), where("userId","==", open?.id)),
        (querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setMessages(list.sort((a,b)=>a.at.toDate()-b.at.toDate()));
        },
        (error) => {
          console.log(error);
        }
      );
    
    
    
    return ()=>{
     
      unsubscribe();
    }
   
  }
  }, [open?.id])
  async function setUser(user){
    const userRef = doc(db, "users", user.id);
    setOpen(user)
    await updateDoc(userRef, {
      sentMsgs: 0,
    });

  }
  async function sendMessage(e) {
    e.preventDefault();
    
    try {
      if(open){
      const data = {
        
          userId: open?.id,
          sender: "admin",
          resiver: open?.username,
          msg: message,
          hasSeen: false,
          at:new Date(),
      }
       
      
      setMessage("");
      await addDoc(collection(db, "messages"), data);

      await updateDoc(doc(db, "users", open?.id), {
        resiveMsgs: open?.resiveMsgs + 1,
      });
    }
    } catch (err) {
      console.log(err);
      alert("something wrong please try again");
    }
  }

  return (
    <section className="message-section">
      <div className={`message-box card ${open?"show": ""}`}>
        {open ? <>
        <div className="head">
          <div className="user f-start">
            <BiArrowBack className="back-icon" onClick={()=>setOpen(null)}/>
            <div className="user-img">
              
              <img className="c-img center" src="" alt={open?.username[0]} />
            </div>
            <h4>{open?.username}</h4>
          </div>
        </div>
        <div className="messages-cont scrollY">
          {messages.map((item, index) => (
            <div
              key={index}
              className={`message-cont f-start ${item.sender === "admin" ? "sender" : ""}`}
            >
              <div className="message">
              {item.sender === "admin" ?<svg viewBox="0 0 8 13" width="8" height="13" className="tringel"><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg> : <svg viewBox="0 0 8 13" width="8" height="13"className="tringel" ><path opacity=".13" fill="#0000000" d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568 8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg>}
              <p>{item.msg}</p>
              <small><ReactTimeAgo date={item?.at.toDate()}locale="en-US" /></small>
              </div>
            </div>
          ))}
         
        </div>
    
         <form className="space-b"  onSubmit={sendMessage}>
         <input placeholder="Type your message" value={message} onChange={(e)=> setMessage(e.target.value)}/>
         <button type="submit" className="center">
           <IoIosSend />
         </button>
       </form>
       </>:<div className="vide-box center" > <img src="/messages.svg" alt=""/> </div>}
      </div>
      <div className="users_side card">
        <div className="head f-start">
          <BiSupport />
          <h4> chate boot</h4>
        </div>
        <div className="search-box f-start">
          <input type="text" placeholder="Search" />
          <FiSearch />
        </div>
        <div className="users scrollY ">
        {users.map((item,index)=>(
        <div className= {`user f-start ${open?.id === item.id? "active": ""}`} key={index} onClick={()=>setUser(item)}>
            <div className="user-img">
              <img className="c-img center" src="" alt={item.username[0]} />
            </div>
            <h4>{item.username}</h4>
            {item.sentMsgs > 0 && <div className="count center"> {item.sentMsgs} </div>}
        </div>
        ))}
        </div>
      </div>
    </section>
  );
}
