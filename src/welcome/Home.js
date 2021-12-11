import React, { Component } from 'react';



class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    render() { 
        return ( 
            <>
            {/* This will be Welcome Window with Login page */}
            
            <div className="columns is-mobile">
              <div className="column container">
            <h1 >Home Page</h1>
            <h1>Welcome to cashTap</h1>
            </div>
            </div>
          

            <div className="columns is-mobile">
              <form className="container column">
              <div className="field">
  <label className="label">Name</label>
  <div className="control">
    <input className="input" type="text" placeholder="Text input" />
  </div>
</div>

<div className="field">
  <label className="label">Username</label>
  <div className="control has-icons-left has-icons-right">
    <input className="input is-success" type="text" placeholder="Text input" value="bulma" />
    <span className="icon is-small is-left">
      <i className="fas fa-user"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-check"></i>
    </span>
  </div>
  <p className="help is-success">This username is available</p>
</div>

<div className="field">
  <label className="label">Email</label>
  <div className="control has-icons-left has-icons-right">
    <input className="input is-danger" type="email" placeholder="Email input" value="hello@" />
    <span className="icon is-small is-left">
      <i className="fas fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p className="help is-danger">This email is invalid</p>
</div>



<div className="field is-grouped">
  <div className="control">
    <button className="button is-link">Submit</button>
  </div>
  <div className="control">
    <button className="button is-link is-light">Cancel</button>
  </div>
</div>
              </form>
            </div>
</>

         );
    }
}
 
export default Welcome;