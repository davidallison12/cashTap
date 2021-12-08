import React from 'react';
import BillCard from './BillCard';



function BillsContainer (props) {
    // console.log(props.billsData[0].bill_type)
    const ListBills = props.billsData.map((bill, i) => {
        //Will use flex inside the div to create a modified "row"
       return(<BillCard key={bill.id} bill={bill}/> )

    })
    return ( 
        <div>
            <h1>This is the Bills Container</h1>
            <div className="space-y-2">
                {ListBills}
            </div>
            
        </div>
     );
}

export default BillsContainer ;