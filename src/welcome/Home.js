
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Login from "./Login";

function Welcome (props) {
  let {user} = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false);
  return ( 
    <div className="back-ground-image-money full-height  is-flex-direction-column is-flex is-align-items-center">
    {/* This will be Welcome Window with Login page */}
    <div className=" ">
      <div className="container">
        <h1 className='is-size-1 has-text-weight-bold has-text-white'>Welcome to cashTap</h1>
        {user &&  <h1>Hello {user.username} </h1>}
       
      </div>
    </div>
    <div className="is-flex is-flex-direction-row is-align-items-space-between is-grouped">
      <h3 className="is-size-3 has-text-weight-bold has-text-white"onClick={() =>setIsSignUp(false)}>Login</h3>
      <h3 className="is-size-3 has-text-weight-bold has-text-white"> | </h3>
      <h3 className="is-size-3 has-text-weight-bold has-text-white" onClick={() =>setIsSignUp(true)}> Sign Up</h3>
    </div>
<div className="box is-5">
    <Login  isSignUp={isSignUp} setIsSignUp={setIsSignUp} baseUrl={props.baseUrl}/>
    </div>
  </div>

   );
}


export default Welcome;
