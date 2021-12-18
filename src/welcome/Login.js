import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";


const Login = (props) => {
  let { loginUser, registerUser } = useContext(AuthContext); //https://stackoverflow.com/questions/25187903/what-do-curly-braces-around-javascript-variable-name-mean
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setEmail] = useState("");

 
  //   console.log({ AuthContext });
  // console.log(useContext(AuthContext))

  let createUser = async (e) => {
      e.preventDefault()
    console.log("Create User Route Hit!");
    if (password === confirmPassword) {
      try {
        let response = await fetch(props.baseUrl + "/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            username: username.toLowerCase(),
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
          }),
        });
        if (response.status === 201) {
          const newUser = await response.json();
          console.log(newUser);
          // loginUser()
          props.setIsSignUp(false)
        }
      } catch {}
    }
  };

   if (props.isSignUp === false) {
    return (
      <div className="columns is-mobile login-popup">
        <form className="container column" onSubmit={loginUser}>
          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Text input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>

           
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Email input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <input className="button is-link" type="submit" value="Login" />
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="columns is-mobile login-popup sign-up">
        <div>
        
        </div>
        <form className="container column" onSubmit={createUser}>
          
          
          {/* USERNAME */}
          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Text input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>

           
          </div>
<div>
          {/* FIRST NAME  */}
          <div className="field">
            <label htmlFor="firstName" className="label">
              First Name:
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="firstName"
                placeholder="Text input"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>

           
          </div>
</div>
          {/* LAST NAME */}
          <div className="field">
            <label htmlFor="lastName" className="label">
              Last Name:
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="lastName"
                placeholder="Text input"
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>

           
          </div>

          {/* EMAIL ADDRESS */}
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Text input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>

            
          </div>

          {/* PASSWORD */}
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Email input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/*Confirm Password */}
            <div className="field">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password:
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                name="confirmPassword"
                  className="input"
                  type="password"
                  placeholder="Email input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <input
                  className="button is-link"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default Login;
