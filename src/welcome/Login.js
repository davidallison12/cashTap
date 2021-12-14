import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = (props) => {
  let { loginUser } = useContext(AuthContext); //https://stackoverflow.com/questions/25187903/what-do-curly-braces-around-javascript-variable-name-mean
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setEmail] = useState("");

  const [isSignUp, setIsSignUp] = useState(true);
  //   console.log({ AuthContext });
  // console.log(useContext(AuthContext))

  let createUser = async (e) => {
      e.preventDefault()
    console.log("Create User Route Hit!");
    if (password === confirmPassword) {
      try {
        let response = await fetch("http://localhost:8000/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        }
      } catch {}
    }
  };

   if (isSignUp === false) {
    return (
      <div className="columns is-mobile">
        <form className="container column" onSubmit={loginUser}>
          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                type="text"
                name="username"
                placeholder="Text input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-danger"
                name="password"
                type="password"
                placeholder="Email input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              <input className="button is-link" type="submit" value="Login" />
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="columns is-mobile">
        <h1>This is the Sign Up Page</h1>
        <form className="container column" onSubmit={createUser}>
          
          
          {/* USERNAME */}
          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                type="text"
                name="username"
                placeholder="Text input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>

            <p className="help is-success">This username is available</p>
          </div>

          {/* FIRST NAME  */}
          <div className="field">
            <label htmlFor="first_name" className="label">
              First Name:
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                type="text"
                name="first_name"
                placeholder="Text input"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>

            <p className="help is-success">This username is available</p>
          </div>

          {/* LAST NAME */}
          <div className="field">
            <label htmlFor="last_name" className="label">
              Last Name:
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                type="text"
                name="last_name"
                placeholder="Text input"
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>

            <p className="help is-success">This username is available</p>
          </div>

          {/* EMAIL ADDRESS */}
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-success"
                type="text"
                name="email"
                placeholder="Text input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>

            <p className="help is-success">This username is available</p>
          </div>

          {/* PASSWORD */}
          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input is-danger"
                name="password"
                type="password"
                placeholder="Email input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>

            {/*Confirm Password */}
            <div className="field">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password:
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-danger"
                  type="password"
                  placeholder="Email input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
