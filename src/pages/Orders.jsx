import React, {useState, useEffect, useContext} from "react";
import { BsSearch } from "react-icons/bs";
import { db } from "../FirebaseConfig";
import {collection, onSnapshot} from "firebase/firestore";
import Duration from "../components/Duration";
import { AdminContext } from "../AdminContext";
export default function Orders() {
   const [orders, setOrders]=useState([])
   const {setOpenCompletForm}=useContext(AdminContext)
   useEffect(() => {
  
     const unsubscribe = onSnapshot(
       collection(db, "orders"),
       (querySnapshot) => {
         const list = [];
         querySnapshot.forEach((doc) => {
           list.push({ id: doc.id, ...doc.data() });
         });
        
         setOrders(list);
       },
       (error) => {
         console.log(error);
       }
     );
     
     return ()=>{
 
       unsubscribe();
     }
    
 
   }, [])
   function dateDiffInDays(ex) {
    const today = new Date();
    let result= "expired"
    if(ex !== null){
      if(today< ex.toDate()) {
        result = Math.floor((ex.toDate() - today) / (1000 * 60 * 60 * 24)) +" days"
        }
    } else {
      result= "whating"
    }
    
    return result;
  }
  return (
    <>
    <div className="head ">
      <h4>Orders</h4>
    </div>
    
    <section>
    <div className="card table scrollY">
      <table>
        <thead>
          <tr>
          
            <th colSpan={2}>Customer</th>
            <th>Customer Email</th>
            <th>Pakage</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Cxpired At</th>
            <th>days left</th>
            <th>
              <select>
                <option value="All">all</option>
                <option value="complted">complted</option>
                <option value="uncomplte">uncomplte</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
        {orders.map((item, index) => (
          <tr key={index}>
            
            <td  className="img-cont">
              <img className="c-img" src={item.image} alt={item.name}/>
            </td>
            <td>{item.name}</td>
            
                  <td>{item.customerEmail}</td>
                  <td>{item.service}</td>
                  <td><Duration d={item.duration}/></td>
                  <td>$ {item.price}</td>
                 
                  <td>{item.createdAt.toDate().toLocaleDateString()}</td>
                  <td>{item.expiredAt  ? item.expiredAt.toDate().toLocaleDateString() : "waiting for creation"}</td>
                  <td>{dateDiffInDays(item.expiredAt)}</td>
                  <td>
                    <button onClick={()=>setOpenCompletForm(item)}>{item.hasComplet ? "Edit" : "complet"}</button>
                  </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </section>
  
    </>
  );
}
