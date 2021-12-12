import React, {useContext, useState} from 'react';
import AuthContext from '../context/AuthContext';

const Login = (props) => {
    let {loginUser} = useContext(AuthContext)  //https://stackoverflow.com/questions/25187903/what-do-curly-braces-around-javascript-variable-name-mean
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
   
    console.log({AuthContext})
    // console.log(useContext(AuthContext))


    return ( 
        <div className="columns is-mobile">
        <form className="container column" onSubmit={loginUser}>
          <div className="field">
            <label htmlFor="username" className="label">Username</label>
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
            <label htmlFor="password" className="label">Password</label>
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
}

export default Login;

