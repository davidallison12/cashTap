import React, { Component } from "react";

class AddBillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_type: "",
      company_name: "",
      bill_due_date: "",
      min_payment: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = this.props.baseUrl + "/api/bills/";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          bill_type: this.state.bill_type.toLowerCase(),
          company_name: this.state.company_name,
          bill_due_date: this.state.bill_due_date,
          min_payment: this.state.min_payment,
          user: this.props.user.user_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        const newBill = await response.json();
        console.log(newBill);
        this.props.addBill(newBill);
        this.setState({
          bill_type: "",
          company_name: "",
          bill_due_date: "",
          min_payment: "",
        });
      }
    } catch (err) {
      console.log("Error =>", err);
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="container">ADD A BILL</h1>
        <form onSubmit={this.handleSubmit}>
          {/* BILL TYPE */}
          <div class="field container">
            <label class="label">Bill Type: </label>
            <div class="control">
              <div class="select">
                <select
                  className=""
                  type="text"
                  id="bill_type"
                  name="bill_type"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.bill_type}
                  required
                >
                  <option>Select Bill Type</option>
                  <option>Cable/Internet</option>
                  <option>Credit Card</option>
                  <option>Insurance</option>
                  <option>Medical</option>
                  <option>Phone</option>
                  <option>Subscription</option>
                  <option>Utilities</option>
                </select>
              </div>
            </div>
          </div>

          {/* BEING PAID TO */}
          <div class="field container">
            <label class="label">Bill Issuer: </label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Text input"
                id="company_name"
                name="company_name"
                onChange={(e) => this.handleChange(e)}
                value={this.state.company_name}
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
          </div>

          {/* DUE DATE */}
          <div class="field container">
            <label class="label">Due Date: </label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="date"
                id="bill_due_date"
                name="bill_due_date"
                onChange={(e) => this.handleChange(e)}
                value={this.state.bill_due_date}
                required
              />
              <span class="icon is-small is-left">
              <i class="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>
          {/* MIN PAYMENT */}
          <div class="field container">
            <label class="label">Minimum Payment: </label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="number"
                step="0.01"
                id="min_payment"
                name="min_payment"
                onChange={(e) => this.handleChange(e)}
                value={this.state.min_payment}
                required
              />
              <span class="icon is-small is-left">
              <i class="fas fa-dollar-sign"></i>
              </span>
            </div>
          </div>    
        <div className="is-grouped field">
          <div className="control is-5"> 
          <button className="button" onClick={() => this.props.setIsAddBill(!this.props.isAddBill)}>Close</button>
          </div>
          <div className="is-2"></div>
          <div className="control is-5">
          <input
            type="submit"
            value="Submit"
           className="button"
          />
          </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddBillForm;
