import { checkPropTypes } from 'prop-types';
import React from 'react';



function Nav(props) {
  const setHome = () => {
    props.setIsAddBill(false)
    props.setIsProfile(false)
  }
  
    return ( 
        <>
        <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" onClick={setHome}>
        Home
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            Add A Bill
          </a>
          <a class="navbar-item">
            Profile
          </a>
          <hr class="navbar-divider"></hr>
          <a class="navbar-item">
            Log Out
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light">
            <strong>Log out</strong>
          </a>
          <div>
          <i class="fas fa-user-circle is-size-2"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
        </>
     );
}

export default Nav;