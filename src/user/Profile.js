import React, { useState, useContext, useEffect } from 'react';
import EditProfile from './EditProfile';
import AuthContext from "../context/AuthContext";



function Profile() {
    const [profileData, setProfileData] = useState(null)
    const [editProfileForm, setEditProfileForm] = useState(false)
    const {user, authTokens} = useContext(AuthContext) 
    
    
    // GETTING PROFILE DATA
    const getProfile = async() => {
        try {
          const response = await fetch("http://localhost:8000/api/profiles/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + String(authTokens.access)
            }
          })
          if (response.status === 200) {
            const userProfile = await response.json()
            console.log(userProfile[0])
            setProfileData(userProfile)
            
          }
    
        }
        catch (err) {
          console.log("Error =>", err)
        }
      }


      const handleUpdatedProfile = (updatedProfile) => {
        console.log(updatedProfile);
        setProfileData(updatedProfile);
      };




       useEffect(() => {
    getProfile()
  }, [])
  
  

     if(editProfileForm ){ 
    return ( 
        <>
        <h1>This is the Edit Profile Form</h1>
       <EditProfile profileData={profileData[0]} allProfileData={profileData} setEditProfileForm={setEditProfileForm} handleUpdatedProfile={handleUpdatedProfile}/>
       </>
     )
    }else {
        return(
        <>

        <button onClick={() =>setEditProfileForm(true)}>Edit Profile</button>
        
        <h1>WELCOME TO THE PROFILE PAGE</h1>
        <h2>HERE IS ALL OF YOUR INFO</h2>

        </>
        )
    }
}

export default Profile;