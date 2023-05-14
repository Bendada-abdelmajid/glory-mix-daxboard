import React, {useState, useEffect, useContext} from "react";
import { GrCompliance } from "react-icons/gr";
import { CiMoneyBill, CiWarning } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import AreaChart from "../components/AreaChart";
import DounathCahrt from "../components/DounathCahrt";
import { db } from "../FirebaseConfig";
import {collection, getCountFromServer, onSnapshot} from "firebase/firestore";
import Duration from "../components/Duration";
import { AdminContext } from "../AdminContext";
import BarChart from "../components/BarChart";
export default function Daxboard() {
  const [userCount, setUserCount]=useState(0)
  const [ordersCompleteCount, setOrdersCompleltCount]=useState(0)
  const [ordersNotComplet, setOrdersNotComplete]=useState([])


  const [LineChartData, setLineChartData ]=useState({})
  const [DonateChartData, setDonateChartData]=useState({})
  const {setOpenCompletForm}=useContext(AdminContext)
  useEffect(() => {
   async function getCount(){
      const coll = collection(db, "users");
      let snapshot = await getCountFromServer(coll);
      setUserCount(snapshot.data().count)
    }
    
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        let timestamp = new Date();
        setOrdersNotComplete(list.filter(el=>el.hasComplet === false));
        setOrdersCompleltCount(list.filter(el=>el.hasComplet === true && el.expiredAt.toDate() >= timestamp ).length)
        const Monts=[]
        const Pakages=[]
        const LineChartList={}
        const DonateChartList={}
        const Durations=[]
      
        const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
        for(let x of list){
          let m=  x.createdAt.toDate().getMonth() ;
          let p= x.service;
          let d= x.duration;
         
            if(!Monts.includes(m)){
              LineChartList[monthNames[m]]=1
              Monts.push(m)
            } else {
              LineChartList[monthNames[m]]+=1
            }
          if(!Pakages.includes(p)){
            DonateChartList[p]=[d]
            Pakages.push(p)
          } else{
            DonateChartList[p].push(d)
          }
          if(!Durations.includes(d)){
            Durations.push(d)
          }
        }
        setLineChartData(LineChartList)
        setDonateChartData(DonateChartList)
     
        console.log(DonateChartList)
      },
      (error) => {
        console.log(error);
      }
    );
    
    return ()=>{
      getCount()
      unsubscribe();
    }
   

  }, [])
  
  require("./daxboard.css")
 const [tab , setTab]=useState(0)


  return (
    <div className="daxboard scrollY">
       <div className="head ">
      <h4>Dashboard</h4>
    </div>
    <section>
      <div className="d-cards">
          <div className="d-card space-b card">
            <div className="icon center">
              <HiOutlineUsers />
            </div>
            <div>
              <h4>{userCount}</h4>
              <p>users</p>
            </div>
          </div>
          <div className="d-card space-b card">
            <div className="icon center">
              <BsCurrencyDollar />
            </div>
            <div>
              <h4>{ordersCompleteCount}</h4>
              <p>Total Revenue</p>
            </div>
          </div>
          <div className="d-card space-b card">
            <div className="icon center">
              <GrCompliance />
            </div>
            <div>
              <h4>{ordersCompleteCount}</h4>
              <p>orders complet</p>
            </div>
          </div>
          <div className="d-card space-b card">
            <div className="icon center">
              <CiWarning />
            </div>
            <div>
              <h4>{ordersNotComplet.length}</h4>
              <p>orders Not complet</p>
            </div>
          </div>
        </div>
      <div className="dax-grid">
       
        <AreaChart  LineChartData={LineChartData}/>
        
        <DounathCahrt   DonateChartData={DonateChartData}/>
        <BarChart DonateChartData={DonateChartData}/>
        <div className="scrollY top-orders card">
        <h4 className="head">uncompletd Acounts</h4>
          <table>
            <tbody>
              {ordersNotComplet.map((item, index) => (
                <tr key={index} onClick={()=>setOpenCompletForm(item)}>

                  <td width={80} className="img-cont">
                    <img className="c-img center" src={item.image} alt={item.name[0]} />
                  </td>
                  <td>{item.name}</td>
                 
                  <td>{item.service}</td>
                  <td><Duration d={item.duration}/></td>
                  <td>$ {item.price}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      </div>
      
      <div className="scrollY top-orders card">
        <h4 className="head">uncompletd Acounts</h4>
          <table>
            <tbody>
              {ordersNotComplet.map((item, index) => (
                <tr key={index}>

                  <td width={80} className="img-cont">
                    <img className="c-img center" src={item.image} alt={item.name[0]} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.customerEmail}</td>
                  <td>{item.service}</td>
                  <td><Duration d={item.duration}/></td>
                  <td>$ {item.price}</td>
                  <td>
                    <button onClick={()=>setOpenCompletForm(item)}>{item.hasComplet ? "" : "complet"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </section>
    </div>
  );
}
