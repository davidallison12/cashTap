import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./context/AuthContext"; //Importing context from AuthContext for authorization (Auth Token)
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import BillsContainer from "./bill/BillsContainer";
import Home from "./welcome/Home";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile"
import Nav from "./components/Nav";
import Menu from "./components/Menu";



function App() {
  let baseUrl = process.env.REACT_APP_BASEURL || "http://localhost:8000";
  let { user, logoutUser, authTokens } = useContext(AuthContext);
  const [billsData, setBillsData] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isUser, setIsUser] = useState(user)
  const [isProfile, setIsProfile] = useState(false)
  const [isAddBill, setIsAddBill] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  //  ========= BILLS CRUD FUNCTIONS =========
  // READ ==> GET
  const getBills = () => {
    fetch(baseUrl + "/api/bills/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + String(authTokens.access)
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        console.log(data);
        setBillsData(data);
      });
  };

  // ADDING A BILL
  const addBill = (newBill) => {
    const copyBills = [...billsData];
    copyBills.push(newBill);
    setBillsData(copyBills);
  };

  // DELETING A BILL
  const deleteBill = async (id) => {
    console.log(id)
    const url = baseUrl + "/api/bills/" + id + "/";

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + String(authTokens.access),
        },
        // credentials:"include"
      });
      if (response.status === 204) { 
        console.log(response);
        const findIndex = billsData.findIndex((bill) => bill.id === id);
        const copyBills = [...billsData];
        copyBills.splice(findIndex, 1);
        setBillsData(copyBills);
      }
    } catch (err) {
      console.log("Error =>", err);
    }
  };

  //UPDATING BILL
  const handleUpdatedBills = (updatedBills) => {
    console.log(updatedBills);
    setBillsData(updatedBills);
  };

  const updateWindowDisplay = () => {
    setIsDesktop(window.innerWidth > 1000);
  };


  // GETTING CURRENT USER
const getCurrentUser = async () => {
  const url = baseUrl + "/api/users/"
  try{
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    if (response.status === 200) {
      
      console.log(data)
      setCurrentUser(data)
      console.log(currentUser)

    }
  }catch (err) {
    console.log("Error =>", err)
  }
}

// UPDATE USER 

// const editUser = (newUser) => {
//   setCurrentUser(newUser)
// }




  // UI Manipulation
  const goToAddToBill = () => {
    setIsProfile(false)
    setIsAddBill(true)
  }

  const goToProfile = () => {
    setIsAddBill(false)
    setIsProfile(true)
  }

  

  useEffect(() => {
    if(user) {
      getBills();
      getCurrentUser()
    }
    // updateWindowDisplay();
  }, [user]);


  useEffect(() => {
    if(user) {
      getBills();

    }

  }, []);


  // useEffect(() => {
  //   window.addEventListener("resize", updateWindowDisplay);
  //   window.removeEventListener("resize", updateWindowDisplay);
  // }, [isDesktop])
  console.log(currentUser)
  return (
    <div className="">
     
      <>
        {user  ? (

          <>
          <div className="box">
          <Nav  logoutUser={logoutUser} setIsAddBill={setIsAddBill} isAddBill={isAddBill} setIsProfile={setIsProfile} isProfile={isProfile} goToAddToBill={goToAddToBill} goToProfile={goToProfile}/>
          </div>
          <div className="columns  app-container full-height">
            <div className="column is-one-fifth box is-fullheight full-height">
              <Menu  setIsProfile={setIsProfile} isProfile={isProfile} setIsAddBill={setIsAddBill} isAddBill={isAddBill} goToAddToBill={goToAddToBill} goToProfile={goToProfile}/>
            </div>


            <div className=" column is-four-fifths full-height-percentage box">
              {!isProfile ? 
              <>
            <BillsContainer
              billsData={billsData}
              baseUrl={baseUrl}
              addBill={addBill}
              getBills={getBills}
              deleteBill={deleteBill}
              handleUpdatedBills={handleUpdatedBills}
              user={user}
              setIsAddBill={setIsAddBill}
              isAddBill={isAddBill}
              currentUser={currentUser[0]}
              allCurrentUsers={currentUser}
              getCurrentUser={getCurrentUser}
            />
            </>:
              <Profile currentUser={currentUser} />
            }
            
            </div>
          </div>
            
          </>
        ) : (
          <Home baseUrl={baseUrl}/>
        )}
      </>
    </div>
  );
}

export default App;

