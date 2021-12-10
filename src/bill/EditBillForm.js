import React, { Component } from "react";

class EditBillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill_type: this.props.billData.bill_type,
      company_name: this.props.billData.company_name,
      bill_due_date: this.props.billData.bill_due_date,
      min_payment: this.props.billData.min_payment,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = this.props.baseUrl + "/api/bills/" + this.props.billData.id + "/"

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          bill_type: this.state.bill_type.toLowerCase(),
          company_name: this.state.company_name,
          bill_due_date: this.state.bill_due_date,
          min_payment: this.state.min_payment,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const updatedBill = await response.json();
        console.log(updatedBill);
        const findIndex = this.props.allBillsData.findIndex((bill) => bill.id === updatedBill.id)
        const copyBills = [...this.props.allBillsData]
        copyBills[findIndex] = updatedBill
        // Function in order ot pass copyBills to state.
        this.props.setEditForm(false)
        this.props.handleUpdatedBills(copyBills)
      } 
      else{
        response.json().then((data) => {
            console.log(data)
        })
      }
    } catch (err) {
      console.log("Error =>", err);
    }
  };

  render() {
    return (
        <>
        <h1>EDIT A BILL</h1>
      <form onSubmit={this.handleSubmit}>
        <div class="mb-6">
          <label
            htmlFor="bill_type"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Type of Bill
          </label>
          <input
            type="text"
            id="bill_type"
            name="bill_type"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => this.handleChange(e)}
            value={this.state.bill_type}
            required
          />
        </div>
        <div class="mb-6">
          <label
            htmlFor="company_name"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Being paid to:
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => this.handleChange(e)}
            value={this.state.company_name}
            required
          />
        </div>

        <div class="mb-6">
          <label
            htmlFor="bill_due_date"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Due Date this month:
          </label>
          <input
            type="date"
            id="bill_due_date"
            name="bill_due_date"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => this.handleChange(e)}
            value={this.state.bill_due_date}
            required
          />
        </div>

        <div class="mb-6">
          <label
            htmlFor="min_payment"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Minimum Required Amount Due:
          </label>
          <input
            type="number"
            step="0.01"
            id="min_payment"
            name="min_payment"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => this.handleChange(e)}
            value={this.state.min_payment}
            required
          />
        </div>

        <input
          type="submit"
          value="Submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>
      </>
    );
  }
}

export default EditBillForm;
