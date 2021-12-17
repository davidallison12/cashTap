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
            <div className="mr-6"><i className="bi-credit-card"></i></div>
            {/* This will be some logo to represent cc, tax, or other debt */}
            <div className="">
                <h3>{bill.company_name}</h3>
                <h5>{bill.bill_due_date}</h5>
            </div>
            <div>
                <h4>{bill.min_payment}</h4>
            </div>
            <div className="is-flex is-flex-direction-row columns column-gap bill-card-button-spacing">
            <button className="button is-danger full-height-percentage box column is-6" onClick={openEditForm}>
            <i className="bi-pen-fill is-size-4" />
            </button>
            <div className="column is-1"></div>
            <button className="button is-danger full-height-percentage box column is-5" onClick={() => props.deleteBill(bill.id)}>
            <i className="bi-trash2-fill is-size-4" />
            </button>

            </div>
        </div>
        </>
     );
}

export default BillCard;