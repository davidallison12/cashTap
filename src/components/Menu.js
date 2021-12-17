import React from 'react';


function Menu(props) {
    return ( 
        <>
        <aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <li><a>Add A Bill</a></li>
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
        </>
     );
}

export default Menu;