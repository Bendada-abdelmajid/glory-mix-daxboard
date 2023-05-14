import React, { useState, useEffect } from "react";
import {  doc , setDoc  } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import "./form.css";
import { IoIosClose } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";

function Settings({openSettForm, setOpenSettForm, links}) {
  console.log(links.facebook)
    const [flip, setFlip] = useState(0);
    const [msg, setMsg] = useState("");
  const [facebook, setFacebook] = useState(links.facebook);
  const [instagrame, setInstagrame] = useState(links.instagrame);
  const [gmail, setGmail] = useState(links.Gmail);
  const [whatsapp, setWhatsapp] = useState(links.whatsapp);
  
  useEffect(() => {
    setFacebook(links.facebook)
    setInstagrame(links.instagrame)
    setGmail(links.Gmail)
    setWhatsapp(links.whatsapp)
  }, [links.whatsapp])

  async function submitProduct(e) {
    e.preventDefault();
    try {
        const data = {
          gmail,
          facebook,
          instagrame,
          whatsapp,
        };

        const res = await setDoc(doc(db, "Admin", "admin"), data);
        setMsg("Profile has been updated");
  
        setFlip(1);
        console.log(res);
      } catch (err) {
        console.log(err)
        alert("something wrong please try again");
      }
    }
  return (
    <>
      <div className={`overlay ${openSettForm ? "show" : ""}`}></div>
      <div className={`flip-card   ${openSettForm ? "show" : ""}`}>
        <div
          className="flip-card-inner"
          style={{ transform: `rotateY(${180 * flip}deg )` }}
        >
          <form
            className={`form flip-card-front card ${flip === 1 ? "hidden" : ""}`}
            onSubmit={submitProduct}
          >
            <div className="space-b form-head">
              <h3>Settings</h3>
              <div className="close-btn center" onClick={()=>{setOpenSettForm(null)}}>
                <IoIosClose />
              </div>
            </div>
            <div className="inputs">
            <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  defaultValue={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                />
                <label htmlFor="title">Gmail</label>
              </p>
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  defaultValue={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
                <label htmlFor="title">Facebook</label>
              </p>

              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  defaultValue={instagrame}
                  onChange={(e) => setInstagrame(e.target.value)}
                />
                <label>Instagrme</label>
              </p>
              <p>
                <input
                  type="text"
                  autoFocus={false}
                  required
                  defaultValue={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
                <label>Whatsapp</label>
              </p>
            </div>
            <button type="submit">Add</button>
          </form>
          <div
            className={`flip-card-back card center  ${
              flip === 0 ? "hidden" : ""
            }`}
          >
            <BsCheck2Circle />
            <p>{msg}</p>
            <div className="btns space-b">
              <button type="button" onClick={() => setFlip(0)}>
                Back
              </button>
              <button type="button" onClick={()=>{setOpenSettForm(null)}}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
