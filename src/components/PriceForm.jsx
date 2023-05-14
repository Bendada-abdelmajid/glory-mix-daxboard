import React, { useState, useEffect, useContext } from "react";

import { collection, doc , setDoc, addDoc  } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import "./form.css";
import { IoIosClose } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";

import { AdminContext } from "../AdminContext";

export default function PriceForm() {
   const {openPriForm, setOpenPriForm}= useContext(AdminContext)
    const [flip, setFlip] = useState(0);
    const [duration, setDuration] = useState("");
    const [durationTwo, setDurationTwo] = useState("");
    const [durationThree, setDurationThree] = useState("");
    const [msg, setMsg] = useState("");
    const [price, setPrice] = useState("");
    const [priceTwo, setPriceTwo] = useState("");
    const [priceThree, setPriceThree] = useState("");
    const [service, setService] = useState("");
  
    function closeForm() {
      setDuration("")
      setDurationTwo("")
      setDurationThree('')
      setPrice("")
      setPriceTwo("")
      setPriceThree("")
      setFlip(0)
      setService("")
      setOpenPriForm({open:false,item:null})
    }
    useEffect(() => {
     
      const pack = openPriForm.item;
      if (pack) {
        setDuration(pack.offerse[0].d)
      setPrice(pack.offerse[0].p)
      setDurationTwo(pack.offerse[1].d)
      setPriceTwo(pack.offerse[1].p)
      setDurationThree(pack.offerse[2].d)
      setPriceThree(pack.offerse[2].p)
      setService(pack.service)
      }
    }, [openPriForm.item]);
  
  
    async function submitProduct(e) {
      e.preventDefault();
      try {
          const data = {
            offerse: [
              {d:duration, p:price}, {d:durationTwo,p:priceTwo},{d:durationThree,p:priceThree}],
            
            service,
          };
          let res;
          if (openPriForm.item) {
            res = await setDoc(doc(db, "prices", openPriForm.item.id), data);
            setMsg("Price has been updated");
            closeForm();
          } else {
            res = await addDoc(collection(db, "prices"), data);
            setMsg("Price has been added");
          }
          setFlip(1);
          console.log(res);
        } catch (err) {
          console.log(err)
          alert("something wrong please try again");
        }
      }
  
    return (
      <>
        <div className={`overlay ${openPriForm.open ? "show" : ""}`} ></div>
        <div className={`flip-card  ${openPriForm.open ? "show" : ""}`}>
          <div className="flip-card-inner" style={{transform: `rotateY(${180 * flip}deg )`}}>
        <form
          className={`form flip-card-front card ${flip==1 ? "hidden" : ""}`}
          onSubmit={submitProduct}
        >
          <div className="space-b form-head">
            <h3>Add Packege</h3>
            <div className="close-btn center" onClick={closeForm}>
              <IoIosClose />
            </div>
          </div>
          <div className="inputs">
              <p>
                <select
                  onChange={(e) => {
                    setService(e.target.value);
                  }}
                >
                 
                  <option value="">Service</option>
                  <option value="spotify" selected={service ==="spotify"}>spotify</option>
                  <option value="shahid" selected={service ==="shahid"}>shahid</option>
                  <option value="Netflix" selected={service ==="Netflix"}>Netflix</option>
                  <option value="IpTv"selected={service ==="IpTv"}>IpTv</option>
                </select>
                
              </p>
              <div className="center" style={{gap:"10px"}}>
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <label htmlFor="title">Duration</label>
              </p>
              
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label>Price</label>
              </p>
              </div>
              <div className="center" style={{gap:"10px"}}>
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  value={durationTwo}
                  onChange={(e) => setDurationTwo(e.target.value)}
                />
                <label htmlFor="title">Duration</label>
              </p>
              
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  value={priceTwo}
                  onChange={(e) => setPriceTwo(e.target.value)}
                />
                <label>Price</label>
              </p>
              </div>
              <div className="center" style={{gap:"10px"}}>
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  value={durationThree}
                  onChange={(e) => setDurationThree(e.target.value)}
                />
                <label htmlFor="title">Duration</label>
              </p>
              
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  value={priceThree}
                  onChange={(e) => setPriceThree(e.target.value)}
                />
                <label>Price</label>
              </p>
              </div>

          </div>
          <button type="submit">Add</button>
  
        </form>
        <div className={`flip-card-back box center  ${flip==0 ? "hidden" : ""}`}>
          <BsCheck2Circle/>
          <p>{msg}</p>
          <div className="btns space-b">
          <button type="button" onClick={()=>setFlip(0)}>Back</button>
          <button type="button" onClick={closeForm}>Cancel</button>
          </div>
          
        </div>
        </div>
        </div>
      </>
    );
  }
  

