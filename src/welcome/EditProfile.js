import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function EditProfile() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [textReminder, setTextReminder] = useState(false);
  const [emailReminder, setEmailReminder] = useState(false);
  const [profileData, setProfileData] = useState(null)
  const {user, authTokens} = useContext(AuthContext) 

const setInputValues = () => {
  setPhoneNumber(profileData.phone_number)
  setTextReminder(profileData.email_reminder)
  setEmailReminder(profileData.textReminder)
}
  

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
        setProfileData(userProfile[0])
        setInputValues()
      }

    }
    catch (err) {
      console.log("Error =>", err)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])


  return (
    <div className="columns is-mobile">
      <h1>This is the Sign Up Page</h1>
      <form className="container column">
        {/* PHONE NUMBER*/}
        <div className="field">
          <label htmlFor="phone_number" className="label">
            Phone Number:
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="text"
              name="phone_number"
              // placeholder="2022223222"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <p className="help is-success">This username is available</p>
        </div>

        {/* TEXT REMINDER */}
        <div className="field">
          <label htmlFor="first_name" className="label">
            Text Reminder:
            <input
              className=""
              type="checkbox"
              name="textReminder"
              value={textReminder}
              onChange={(e) => setTextReminder(e.target.value)}
            />
          </label>

          <p className="help is-success">This username is available</p>
        </div>

        {/* EMAIL REMINDER*/}
        <div className="field">
          <label htmlFor="last_name" className="label">
            Email Reminder:
            <input
              className=""
              type="checkbox"
              name="emailReminder"
              value={emailReminder}
              onChange={(e) => setEmailReminder(e.target.value)}
            />
          </label>
        </div>

        <p className="help is-success">This username is available</p>
        <div className="field is-grouped">
              <div className="control">
                <input
                  className="button is-link"
                  type="submit"
                  value="Update Profile"
                />
              </div>
            </div>
      </form>
    </div>
  );
}

export default EditProfile;
