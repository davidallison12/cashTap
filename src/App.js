import React, { Component } from "react";
import "./App.css";
import BillsContainer from "./bill/BillsContainer";

let baseUrl = process.env.REACT_APP_BASEURL || "http://localhost:8000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billsData: [],
      isDesktop: false,
    };
  }

  // ========= BILLS CRUD FUNCTIONS =========
  // READ ==> GET
  getBills = () => {
    fetch(baseUrl + "/api/bills/")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          billsData: data,
        });
      });
  };

  // ADDING A BILL 
  addBill = (newBill) => {
    const copyBills = [...this.state.billsData];
    copyBills.push(newBill);
    this.setState({
      billsData: copyBills,
    });
  };
  
  // DELETING A BILL
  deleteBill = async (id) => {
    const url = baseUrl + "/api/bills/" + id + "/"

    try{
      const response = await fetch(url, {
        method: "DELETE"
      })
      if(response.status === 204) {
        console.log(response)
        const findIndex = this.state.billsData.findIndex((bill) => bill.id === id)
        const copyBills = [...this.state.billsData]
        copyBills.splice(findIndex, 1)
        this.setState({
          billsData: copyBills
        })
      }

    }
    catch(err) {
      console.log("Error =>", err)
    }
  }





  updateWindowDisplay = () => {
    this.setState({
      isDesktop: window.innerWidth > 1024,
    });
  };

  componentDidMount() {
    this.getBills();
    this.updateWindowDisplay();
    window.addEventListener("resize", this.updateWindowDisplay);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDisplay);
  }

  render() {
    return (
      <div className="font-sans">
        {this.state.isDesktop ? (
          <>
            <h1>Welcome to the App!!! Desktop Version </h1>
            <BillsContainer
              billsData={this.state.billsData}
              baseUrl={baseUrl}
              addBill={this.addBill}
              getBills={this.getBills}
              deleteBill={this.deleteBill}
            />
          </>
        ) : (
          <h1>Welcome to the App!!! Tablet/Mobile Version</h1>
        )}
      </div>
    );
  }
}

export default App;
