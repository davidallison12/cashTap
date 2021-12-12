import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Login from "./Login";

function Welcome () {
  let {user} = useContext(AuthContext)
  return ( 
    <>
    {/* This will be Welcome Window with Login page */}
    <div className="columns is-mobile">
      <div className="column container">
        <h1>Home Page</h1>
        <h1>Welcome to cashTap</h1>
        {user &&  <h1>Hello {user.username} </h1>}
       
      </div>
    </div>

    <Login />
  </>
   );
}


export default Welcome;
