// Page is for connecting to DB to authenticate user. 
// Will also be used for authorization process
// Used to share global User data w/o the need for props
//We will have consumers and providers 

import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode"; // Decodes JSON access tocken and gives info on username and Foreign key among other things


const AuthContext = createContext()


export default AuthContext





export const AuthProvider = ({children}) => {
    const baseUrl = process.env.BACKEND || "http://localhost:8000"
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) //parse is turning json into object -> Opposite of stringify

    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    let [loading, setLoading] = useState(true)

    
    let loginUser = async (e) => {
        e.preventDefault()
        console.log("Login Submitted")
        try{
        let response = await fetch(baseUrl + '/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value,
            })
        })
        let data = await response.json()
        console.log('data', data)
        console.log(response)
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode((data.access)))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            console.log("Something went wrong! Response Err =>", response.status)
        }
        console.log(user)

    }catch (err) {
        console.log("Err =>", err)
    }

    }
    

    let logoutUser = () => {
        console.log('You hit it')
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        console.log(user)
        console.log(authTokens)
    }

    let updateToken = async () => {
        console.log('Update Token called')
        let response = await fetch(baseUrl + '/api/token/refresh/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': authTokens?.refresh // If nothing there we do not want to refresh
            })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode((data.access)))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }

    }

    let registerUser = async (username, password, confirmPassword, first_name, last_name, email) => {
        
        console.log("Create User Route Hit!");
    if (password === confirmPassword) {
      try {
        let response = await fetch(baseUrl + "/api/users/", {
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
      } catch (err){
          console.log('Error =>', err )
      }
    }
    }
    

    useEffect (() => {

        if (loading) {
            updateToken()
        }
        let fourMinutesFifty = 300000
        let interval = setInterval(() => {
            if(authTokens) {
                updateToken()
            }
        }, fourMinutesFifty) // Will fire every 2 seconds to fetch refresh token
        return () => clearInterval(interval)
    }, [authTokens, loading])


    let contextData = {
        user : user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        authTokens: authTokens,
        registerUser: registerUser
    }

// We are providing the code
    return(
        <AuthContext.Provider value={contextData}> 
            {loading ? null : children}
        </ AuthContext.Provider>
    )
}


