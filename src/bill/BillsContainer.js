import React, { useState } from "react";
import BillCard from "./BillCard";
import AddBillForm from './AddBillForm'
import EditBillForm from "./EditBillForm";

function BillsContainer(props) {
    const [editForm, setEditForm] = useState(false)
    const [billForEdit, setBillForEdit] = useState(null)
  // console.log(props.billsData[0].bill_type)
  const ListBills = props.billsData.map((bill, i) => {
    //Will use flex inside the div to create a modified "row"
    return <BillCard key={bill.id} bill={bill} deleteBill={props.deleteBill}  setEditForm={setEditForm} editForm={editForm} setBillForEdit={setBillForEdit}/>;
  });
  return (
    <div className="block">
      <h1 className="block">This is the Bills Container</h1>
      <div className="space-y-2 block">{ListBills}</div>
      <AddBillForm  baseUrl={props.baseUrl} addBill={props.addBill} getBills={props.getBills} user={props.user}/>
      
      {editForm &&

      <EditBillForm baseUrl={props.baseUrl} setEditForm={setEditForm} billData={billForEdit} allBillsData={props.billsData} handleUpdatedBills={props.handleUpdatedBills}/>
      }
    </div>
  );
}

export default BillsContainer;
