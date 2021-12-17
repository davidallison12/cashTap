import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Login from "./Login";

function Welcome () {
  let {user} = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false);
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
    <div>
      <h3 onClick={() =>setIsSignUp(false)}>Login</h3>
      <h3> | </h3>
      <h3 onClick={() =>setIsSignUp(true)}>Sign Up</h3>
    </div>

    <Login  isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>
  </>
   );
}


export default Welcome;
