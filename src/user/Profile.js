import React, { useState, useContext, useEffect } from "react";
import EditProfile from "./EditProfile";
import AuthContext from "../context/AuthContext";

function Profile() {
  const baseUrl = process.env.REACT_APP_BASEURL || "http://localhost:8000"
  const [profileData, setProfileData] = useState(null);
  const [editProfileForm, setEditProfileForm] = useState(false);
  const { user, authTokens } = useContext(AuthContext);

  //Twilo
  // const [message, setMessage] = useState(
  //   {
  //   to: '',
  //   body: ''
  // })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const twilioUrl = process.env.TWILIOURL || "http:localhost:3001"

  // GETTING PROFILE DATA
  const getProfile = async () => {
    try {
      const response = await fetch(baseUrl + "/api/profiles/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      if (response.status === 200) {
        const userProfile = await response.json();
        console.log(userProfile[0]);
        setProfileData(userProfile);
      }
    } catch (err) {
      console.log("Error =>", err);
    }
  };

  const handleUpdatedProfile = (updatedProfile) => {
    console.log(updatedProfile);
    setProfileData(updatedProfile);
  };

  const textConfirmEnrollment = () => {
    setSubmitting(true)
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to:profileData[0].phone_number,
        body:`Welcome to the cashTap ${user.username}`
      }) 
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setError(false)
        setSubmitting(false)
      } else{
        setError(true)
        setSubmitting(false)
      }
    })
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (editProfileForm) {
    return (
      <>
        <h1>This is the Edit Profile Form</h1>
        <EditProfile
          profileData={profileData[0]}
          allProfileData={profileData}
          setEditProfileForm={setEditProfileForm}
          handleUpdatedProfile={handleUpdatedProfile}
          textConfirmEnrollment={textConfirmEnrollment}
          baseUrl={baseUrl}
        />
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => setEditProfileForm(true)}>Edit Profile</button>

        <h1>WELCOME TO THE PROFILE PAGE</h1>
        <h2>HERE IS ALL OF YOUR INFO</h2>
      </>
    );
  }
}

export default Profile;
