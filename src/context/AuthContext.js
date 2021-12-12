// Page is for connecting to DB to authenticate user. 
// Will also be used for authorization process
// Used to share global User data w/o the need for props
//We will have consumers and providers 

import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode"; // Decodes JSON access tocken and gives info on username and Foreign key among other things


const AuthContext = createContext()


export default AuthContext





export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) //parse is turning json into object -> Opposite of stringify

    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    
    let loginUser = async (e) => {
        e.preventDefault()
        console.log("Login Submitted")
        try{
        let response = await fetch('http://localhost:8000/api/token/', {
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
    
    let contextData = {
        user : user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

// We are providing the code
    return(
        <AuthContext.Provider value={contextData}> 
            {children}
        </ AuthContext.Provider>
    )
}


