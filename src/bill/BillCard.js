import React from 'react';


function BillCard (props) {
    const bill = props.bill
    return ( 
        <div>
            {/* This will be some logo to represent cc, tax, or other debt */}
            <div>
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