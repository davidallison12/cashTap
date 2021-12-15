import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./context/AuthContext"; //Importing context from AuthContext for authorization (Auth Token)
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import BillsContainer from "./bill/BillsContainer";
import Home from "./welcome/Home";
import EditProfile from "./welcome/EditProfile";

let baseUrl = process.env.REACT_APP_BASEURL || "http://localhost:8000";

function App() {
  let { user, logoutUser, authTokens } = useContext(AuthContext);
  const [billsData, setBillsData] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isUser, setIsUser] = useState(user)
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
    const url = baseUrl + "/api/bills/" + id + "/";

    try {
      const response = await fetch(url, {
        method: "DELETE",
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







  useEffect(() => {
    if(user) {
      getBills();
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
  console.log(user)
  return (
    <div className="">
     
      <>
        {user  ? (

          <>
            {/* <h1>Welcome to the App!!! Desktop Version </h1>
            <button onClick={logoutUser}>Logout</button>
            <BillsContainer
              billsData={billsData}
              baseUrl={baseUrl}
              addBill={addBill}
              getBills={getBills}
              deleteBill={deleteBill}
              handleUpdatedBills={handleUpdatedBills}
              user={user}
            /> */}
            <EditProfile />
          </>
        ) : (
          <Home />
        )}
      </>
    </div>
  );
}

export default App;

// class App extends Component {
//   static contextType = AuthContext
//   constructor(props) {
//     super(props);
//     this.state = {
//       billsData: [],
//       isDesktop: false,
//     };
//   }

//   // ========= BILLS CRUD FUNCTIONS =========
//   // READ ==> GET
//   getBills = () => {
//     fetch(baseUrl + "/api/bills/")
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         } else {
//           return [];
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         this.setState({
//           billsData: data,
//         });
//       });
//   };

//   // ADDING A BILL
//   addBill = (newBill) => {
//     const copyBills = [...this.state.billsData];
//     copyBills.push(newBill);
//     this.setState({
//       billsData: copyBills,
//     });
//   };

//   // DELETING A BILL
//   deleteBill = async (id) => {
//     const url = baseUrl + "/api/bills/" + id + "/"

//     try{
//       const response = await fetch(url, {
//         method: "DELETE"
//       })
//       if(response.status === 204) {
//         console.log(response)
//         const findIndex = this.state.billsData.findIndex((bill) => bill.id === id)
//         const copyBills = [...this.state.billsData]
//         copyBills.splice(findIndex, 1)
//         this.setState({
//           billsData: copyBills
//         })
//       }

//     }
//     catch(err) {
//       console.log("Error =>", err)
//     }
//   }

//   //UPDATING BILL
//   handleUpdatedBills = (updatedBills) => {
//     console.log(updatedBills)
//     this.setState({
//       billsData: updatedBills
//     })
//   }

//   updateWindowDisplay = () => {
//     this.setState({
//       isDesktop: window.innerWidth > 1000,
//     });
//   };

//   componentDidMount() {
//     const user = this.context.client
//     this.getBills();
//     this.updateWindowDisplay();
//     window.addEventListener("resize", this.updateWindowDisplay);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("resize", this.updateWindowDisplay);
//   }

//   render() {

//     return (
//       <div className="">
//         {this.state.isDesktop ? (
//           <>
//         <AuthProvider>
//           {user ?
//           <>
//           <h1>Welcome to the App!!! Desktop Version </h1>
//           <button>Logout</button>
//           <BillsContainer
//             billsData={this.state.billsData}
//             baseUrl={baseUrl}
//             addBill={this.addBill}
//             getBills={this.getBills}
//             deleteBill={this.deleteBill}
//             handleUpdatedBills={this.handleUpdatedBills}
//           />
//           </>
//         :
//         <Home />
//         }
//         </AuthProvider>
//           </>
//         ) : (
//           <h1>Welcome to the App!!! Tablet/Mobile Version</h1>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
