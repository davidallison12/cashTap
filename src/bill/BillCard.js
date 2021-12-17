import React from 'react';


function BillCard (props) {
    const bill = props.bill

    const openEditForm = () =>{
        // console.log(!props.editForm)
        props.setEditForm(!props.editForm)
        props.setBillForEdit(bill)
    }
    return ( 
    <>
        <div className='is-flex is-justify-content-space-between box '>
            <div className="is-size-2"><i className="bi-credit-card"></i></div>
            {/* This will be some logo to represent cc, tax, or other debt */}
            <div className="">
                <h3 className="is-size-5 has-text-weight-semibold">{bill.company_name}</h3>
                <h5 className="is-size-7 has-text-weight-medium">{bill.bill_due_date}</h5>
            </div>
            <div>
                <h4 className="has-text-weight-medium" >{bill.min_payment}</h4>
            </div>
            <div className="is-flex is-flex-direction-row columns column-gap bill-card-button-spacing">
            <button className="button three-quarters-height-percentage is-danger box column is-6" onClick={openEditForm}>
            <i className="bi-pen-fill is-size-4" />
            </button>
            <div className="column is-1"></div>
            <button className="button is-danger three-quarters-height-percentage box column is-5" onClick={() => props.deleteBill(bill.id)}>
            <i className="bi-trash2-fill is-size-4" />
            </button>
<div className="is-flex is-flex-direction-row columns column-gap bill-card-button-spacing"></div>
            </div>
        </div>
        </>
     );
}

export default BillCard;