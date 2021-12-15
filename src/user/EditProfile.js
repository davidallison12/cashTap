import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function EditProfile(props) {
  const [profileData, setProfileData] = useState(props.profileData);
  const [phoneNumber, setPhoneNumber] = useState(profileData.phone_number);
  const [textReminder, setTextReminder] = useState(profileData.text_reminder);
  const [emailReminder, setEmailReminder] = useState(
    profileData.email_reminder
  );
  const { user, authTokens } = useContext(AuthContext);

  // const setInputValues = () => {
  //   setPhoneNumber(profileData.phone_number)
  //   setTextReminder(profileData.email_reminder)
  //   setEmailReminder(profileData.textReminder)
  // }

  //EDIT PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/profiles/" + profileData.id + "/";
    console.log(e.target.textReminder.checked);
    console.log(user);
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          phone_number: e.target.phoneNumber.value,
          text_reminder: e.target.textReminder.checked,
          email_reminder: e.target.emailReminder.checked,
          user: profileData.user,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
          Accept: "application/json",
        },
        // credentials: "include"
      });
      if (response.status === 200) {
        const updatedProfile = await response.json();
        console.log(updatedProfile);
        // const findIndex = profileData.findIndex((profile) => profile.id === updatedBill.id)
        const copyProfiles = [...props.allProfileData];
        copyProfiles[0] = updatedProfile;
        // Function in order ot pass copyBills to state.
        props.setEditProfileForm(false);
        props.handleUpdatedProfile(copyProfiles);
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
    } catch (err) {
      console.log("Error =>", err);
    }
  };

  return (
    <div className="columns is-mobile">
      <h1>TTHis is the Form Itself</h1>
      <form className="container column" onSubmit={handleSubmit}>
        {/* PHONE NUMBER*/}
        <div className="field">
          <label htmlFor="phone_number" className="label">
            Phone Number:
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="text"
              name="phoneNumber"
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
            {textReminder ? (
              <input
                className=""
                type="checkbox"
                name="textReminder"
                checked
                onChange={(e) => setTextReminder(e.target.checked)}
              />
            ) : (
              <input
                className=""
                type="checkbox"
                name="textReminder"
                onChange={(e) => setTextReminder(e.target.checked)}
              />
            )}
          </label>

          <p className="help is-success">This username is available</p>
        </div>

        {/* EMAIL REMINDER*/}
        <div className="field">
          <label htmlFor="last_name" className="label">
            Email Reminder:
            {emailReminder ? (
              <input
                className=""
                type="checkbox"
                name="emailReminder"
                checked
                onChange={(e) => setEmailReminder(e.target.checked)}
              />
            ) : (
              <input
                className=""
                type="checkbox"
                name="emailReminder"
                onChange={(e) => setEmailReminder(e.target.checked)}
              />
            )}
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
