import React, { useState, useContext, useEffect } from "react";
import EditProfile from "./EditProfile";
import AuthContext from "../context/AuthContext";


function Profile(props) {
  const baseUrl = process.env.REACT_APP_BASEURL || "http://localhost:8000"
  const [profileData, setProfileData] = useState({});
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
  const twilioUrl = process.env.REACT_APP_TWILIO_URL || "http://localhost:3001"
  const [isFetched, setIsFetched] = useState(false)

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
      const userProfile = await response.json();
      if (response.status === 200) {
        console.log(userProfile);
        setProfileData(userProfile);
        // setIsFetched(true)
        // setIsFetched(false)
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
    fetch(twilioUrl + '/api/messages', {
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
  
  }, [user]);

 
  
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
      <div className="is-flex is-flex-direction-row is-justify-content-space-around">
<div className="box profile-detail-full-height">
  <div className="container">
        <h1 className="is-size-2">{props.currentUser.first_name} {props.currentUser.last_name}'s Profile</h1>
        
        </div>
        <div className="box box-ninty-percent">
          <h3><span className="has-text-weight-bold profile-list-items is-size-5">First Name:    </span>{props.currentUser.first_name}</h3>
          <h3><span className="has-text-weight-bold profile-list-items is-size-5">Last Name:    </span>{props.currentUser.last_name}</h3>
          <h3><span className="has-text-weight-bold profile-list-items is-size-5">Username:    </span>{props.currentUser.username}</h3>
          <h3><span className="has-text-weight-bold profile-list-items is-size-5">Email Address:    </span>{props.currentUser.email}</h3>
          {
            Array.isArray(profileData) &&
            <>
            <h3><span className="has-text-weight-bold profile-list-items is-size-5">Phone Number:    </span>{profileData[0].phone_number}</h3>
            <h3><span className="has-text-weight-bold profile-list-items is-size-5">Text Reminder:    </span>{profileData[0].text_reminder ? "Yes" : "No"}</h3>
            <h3><span className="has-text-weight-bold profile-list-items is-size-5">Email Address:    </span>{profileData[0].email_reminder ? "Yes" : "No"}</h3>
            
            </>
          }
          <div className="">
        <button className="button"onClick={() => setEditProfileForm(true)}>Edit Profile</button>
          </div>
        </div>
        </div>

        <div>
        <div className="profile-avatar">
        <i class="fas fa-user-circle"></i>
        </div>
        </div>
        </div>
    );
  }
}

export default Profile;
