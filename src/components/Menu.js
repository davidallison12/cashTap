import React from 'react';


function Menu(props) {
    return ( 
        <div className="">
        <aside class="menu">
        <div class="message-header is-white menu-message-header box">
    <p>Menu</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <li onClick={() => props.setIsAddBill(!props.isAddBill)}><a>Add A Bill</a></li>
    <li><a>Dashboard</a></li>
    <li><a>Customers</a></li>
  </ul>
  <p class="menu-label">
    Administration
  </p>
  <ul class="menu-list">
    <li><a onClick={() =>props.setIsProfile(true)}> Manage Profile </a></li>
  </ul>
</aside>
</div>
     );
}

export default Menu;