import React from 'react'
import {TiWarningOutline} from "react-icons/ti"
import { db } from "../FirebaseConfig";
import {deleteDoc, doc} from "firebase/firestore";
function DeleteBox({openDelete, setOpenDelete}) {
    async function deletePackage(id){
        setOpenDelete({title:"", id:null})
        await deleteDoc(doc(db, "prices", id));
        
    }
  return (
    <>
    <div className={`overlay ${openDelete.id ? "show" : ""}`} ></div>
    <div className={`delete-box box ${openDelete.id ? "show" : ""}`}>
        
        <p className='center'>Are you sure to delete this {openDelete.title}</p>
        <div className="center btns">
        <button onClick={()=>setOpenDelete({title:"", id:null})}>Cancel</button>
            <button onClick={()=>deletePackage(openDelete.id)}>delete</button>
            
        </div>
    </div>
    </>
  )
}

export default DeleteBox