import React from 'react';


function BillCard (props) {
    const bill = props.bill

    const openEditForm = () =>{
        // console.log(!props.editForm)
        props.setEditForm(!props.editForm)
        props.setBillForEdit(bill)
    }
    return ( 
        <div className='flex border-2 border-red-500 justify-between'>
            <div className="mr-6"><i className="bi-credit-card border-2 border-red-500 text-5xl"></i></div>
            {/* This will be some logo to represent cc, tax, or other debt */}
            <div className="border-2 border-red-500">
                <h3>{bill.company_name}</h3>
                <h5>{bill.bill_due_date}</h5>
            </div>
            <div>
                <h4>{bill.min_payment}</h4>
            </div>
            <div>
            <button class="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={openEditForm}>
                Edit
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => props.deleteBill(bill.id)}>
                Delete
            </button>

            </div>
        </div>
     );
}

export default BillCard;