import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';



function Nav(props) {
  let { user, logoutUser, authTokens } = useContext(AuthContext);

  const setHome = () => {
    props.setIsAddBill(false)
    props.setIsProfile(false)
  }
  
  
    return ( 
        <>
        <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      {/* <img className="image is-128x128" src="https://previews.123rf.com/images/putracetol/putracetol1808/putracetol180801371/106766113-abacus-school-and-education-logo-icon-design.jpg"/> */}
      <h1 className="has-text-weight-bold is-size-2 is-family-monospace">CashTAP</h1>
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
          <a class="navbar-item" onClick={logoutUser}>
            Log Out
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div onClick={logoutUser}class="buttons">
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