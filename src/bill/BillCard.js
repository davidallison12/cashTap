import React from 'react';


function BillCard (props) {
    const bill = props.bill
    return ( 
        <div className='flex border-2 border-red-500'>
            <div className="mr-6"><i className="bi-credit-card border-2 border-red-500 text-5xl"></i></div>
            {/* This will be some logo to represent cc, tax, or other debt */}
            <div className="border-2 border-red-500">
                <h3>{bill.company_name}</h3>
                <h5>{bill.bill_due_date}</h5>
            </div>
            <div>
                <h4>{bill.min_payment}</h4>
            </div>
        </div>
     );
}

export default BillCard;