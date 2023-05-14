import React, { useState, useEffect, useContext } from "react";
import DeleteBox from '../components/DeleteBox';
import { BsTrash , BsPlus} from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { db } from "../FirebaseConfig";
import {collection, onSnapshot} from "firebase/firestore";
import { AdminContext } from "../AdminContext";
function Prices() {
  const [openDelete, setOpenDelete] = useState({ title: "", id: null });
    const {setOpenPriForm}= useContext(AdminContext)
    const [data, setData] = useState([]);
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "prices"),
        (querySnapshot) => {
          const list = [];
         
          querySnapshot.forEach((doc) => {
           
            list.push({ id: doc.id, ...doc.data() });
          });
        
          setData(list);
          console.log(list)
        },
        (error) => {
          console.log(error);
        }
      );
      
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    
    
    <div className="head space-b">
        <h4>Prices</h4>
      </div>
      <div className="cards scrollY">
        {data.map((item, index) => (
          <div className={`card box`}  key={index} >
            <div className="table-title space-b">
              <h2>{item.service}</h2>
              <div className="center btns">
                <button
              style={{ background: "var(--bs-red)" }}
              onClick={()=>setOpenDelete({title:"Package", id:item.id})}
              className="center"
            >
              <BsTrash /> Delete
            </button>
            <button className="center" onClick={()=>setOpenPriForm({open:true, item:item})}>
              <MdOutlineEdit /> Edite
            </button></div>
              
         
            </div>
            <div className="card-body">
            {item.offerse.map((el, ind)=>(
           <div className="space-b">
            <p>duration :{el.d === "1"? "one Month" : el.d === "12" ? "year": el.d + " Months"}</p>
            <h3>{el.p}Dh</h3>
           </div>
            ))}
            </div>
           
          </div>
      
        ))}
      </div>
  
 
    <div className="add-btn center" title='Add Price' onClick={()=> setOpenPriForm({open:true, item:null})}>
        <BsPlus/> 
     </div>
     <DeleteBox openDelete={openDelete} setOpenDelete={setOpenDelete}/>
    </>

  )
}

export default Prices