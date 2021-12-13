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
          user: this.props.user.user_id
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
        <>
        <h1>ADD A BILL</h1>
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
            placeholder="Credit Card"
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

export default AddBillForm;
