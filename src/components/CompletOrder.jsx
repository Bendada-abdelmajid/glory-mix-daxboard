import React, { useContext, useState, useEffect } from "react";
import { doc, updateDoc} from "firebase/firestore";
import { AdminContext } from "../AdminContext";
import { db } from "../FirebaseConfig";
import { IoIosClose } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";
export default function CompletOrder() {
  const { openCompletForm, setOpenCompletForm } = useContext(AdminContext);
  const [flip, setFlip] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  function closeForm() {
    setEmail("");
    setPassword("");
    setFlip(0);
    setOpenCompletForm(null);
  }
  useEffect(() => {
    if (openCompletForm) {
      setEmail(openCompletForm.email);
      setPassword(openCompletForm.password);
    }
  }, [openCompletForm]);
  async function submitForm(e) {
    e.preventDefault();
    if (openCompletForm) {
    try {
        const date = new Date();
      await updateDoc(doc(db, "orders", openCompletForm?.id), {
        hasComplet: true,
        hasSeen: true,
        email,
        password,
        createdAt: new Date(),
        expiredAt: new Date(date.setDate(date.getDate() + parseInt( openCompletForm?.duration) * 30))
      });

      setMsg("Account has been added");
      setFlip(1);
      closeForm();
    } catch (err) {
      console.log(err);

      setMsg("something wrong please try again");
      setFlip(1);
    }
}
  }
  return (
    <>
    <div className={`overlay ${openCompletForm ? "show" : ""}`} ></div>
    <div className={`flip-card  ${openCompletForm ? "show" : ""}`}>
      <div className="flip-card-inner" style={{transform: `rotateY(${180 * flip}deg )`}}>
    <form
      className={`form flip-card-front box ${flip==1 ? "hidden" : ""}`}
      onSubmit={submitForm}
    >
      <div className="space-b form-head">
        <h3>Complet Order for {openCompletForm?.name}</h3>
        <div className="close-btn center" onClick={closeForm}>
          <IoIosClose />
        </div>
      </div>
      <h4>{openCompletForm?.service}</h4>
      <div className="inputs">
          
          <p>
            <input
              type="text"
              autoFocus={false}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="title">Email</label>
          </p>
          
          <p>
            <input
              type="text"
              autoFocus={false}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </p>
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
  </>);
}
