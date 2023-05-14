import React, { useState, useEffect } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";

import {

  AiOutlineLogout,

} from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosNotificationsOutline,
  IoMdContract,
  IoMdExpand,
  IoMdMenu,
} from "react-icons/io";
import { BiMessage } from "react-icons/bi";
import { useNavigate , Link} from "react-router-dom";
import { db, auth } from "../FirebaseConfig";
import {
  collection,

  query,
  where,
  onSnapshot,

} from "firebase/firestore";
import Duration from "./Duration";
import { TbSun, TbSunOff } from "react-icons/tb";

import {signOut} from 'firebase/auth' 
export default function Header({
  navState,
  setNavState,
  user,
  setUser,
  setOpenSettForm,
  dark,setDark
}) {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const [openMenu, setopenMenu] = useState("");
  const [notifications, setNotifications] = useState([]);
  const logout = () => {
  
    signOut(auth).then(() => {
      navigate("/login")
      setUser(null)
    }).catch((error) => {
      alert("An error happened.")
    });

  }

  const appTheme = () => {
    setDark(!dark);
    localStorage.setItem("daxboardTheme", !dark);
  };
  useEffect(() => {
    const q = query(collection(db, "orders"), where("hasSeen", "==", false));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setNotifications(list);
        console.log(notifications);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  function expandWindow() {
    if (expand) {
      document.exitFullscreen();
      setExpand(false);
    } else {
      document
        .querySelector(".admin")
        .requestFullscreen()
        .catch((err) => {
          console.log(err);
        });
      setExpand(true);
    }
  }

  return (
    <header className="space-b">
      <div className="col center" style={{ gap: "15px" }}>
        <IoMdMenu
          className="header-btn"
          onClick={() => setNavState(!navState)}
        />
        <div className="search-box f-start">
          <input type="text" placeholder="Search" />
          <FiSearch />
        </div>
      </div>

      <div className="col center">
        <div className="header-btn" onClick={expandWindow}>
          {expand ? <IoMdContract /> : <IoMdExpand />}
        </div>
        <div
          className={`drop-down-cont ${
            openMenu == "notification" ? "open" : ""
          }`}
        >
          <div
            className="notifi-btn center drop-down-btn"
            onClick={() => {
              setopenMenu(openMenu == "notification" ? "" : "notification");
            }}
          >
            <div className="count">{notifications.length}</div>
            <IoIosNotificationsOutline />
          </div>
          <div className="drop-down notifications card">
            <p>Notifications</p>
            {notifications.length > 0 ? ( 
            notifications.map((item, index) => (
                
                <div className="item f-start" key={index}>
                   <img className="c-img center" src={item.image} alt={item.name[0]} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>
                      Order {item.service} for <Duration d={item.duration}/>
                    </p>
                  </div>
                </div>
              ))
              ) : (
              <h4>no Notifications</h4>
            )} 
          </div>
        </div>
        <div
          className={`drop-down-cont ${openMenu == "profile" ? "open" : ""}`}
        >
          <div
            className="user center drop-down-btn"
            onClick={() => {
              setopenMenu(openMenu == "profile" ? "" : "profile");
            }}
          >
            <img className="c-img" src={user?.photoURL} alt="" />
            <h4>Hi Ouner</h4>
            <IoIosArrowDown />
          </div>
          <div className="drop-down card">
            <p>
              Welcom
              <br /> {user?.displayName}
            </p>
           
            <div className="item f-start" onClick={appTheme}>
            {dark ? <TbSunOff />: <TbSun/>} Dark
               
            </div>
            <Link to={"/messages"} className="item f-start">
              <BiMessage /> Messages
            </Link>

            <div className="item f-start" onClick={() => setOpenSettForm(user)}>
              <FiSettings /> Settings
            </div>
            <div className="br"></div>
            <div className="item f-start" onClick={logout}>
              <AiOutlineLogout /> Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
