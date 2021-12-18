import React, { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "../context/AuthContext";

function EditProfile(props) {
  const [firstName, setFirstName] = useState(props.currentUser[0].first_name)
  const [lastName, setLastName] = useState(props.currentUser[0].last_name)
  const [email, setEmail] = useState(props.currentUser[0].email)
  const [username, setUsername] = useState(props.currentUser[0].username)
  const [profileData, setProfileData] = useState(props.profileData);
  const [phoneNumber, setPhoneNumber] = useState(profileData.phone_number);
  const [textReminder, setTextReminder] = useState(profileData.text_reminder);
  const [emailReminder, setEmailReminder] = useState(
    profileData.email_reminder
  );
  const [password, setPassword] = useState("")
  const { user, authTokens } = useContext(AuthContext);

  // const setInputValues = () => {
  //   setPhoneNumber(profileData.phone_number)
  //   setTextReminder(profileData.email_reminder)
  //   setEmailReminder(profileData.textReminder)
  // }

  //EDIT PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = props.baseUrl + "/api/profiles/" + profileData.id + "/";
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
        // handleEditUserSubmit(e)
        props.textConfirmEnrollment()
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
    } catch (err) {
      console.log("Error =>", err);
    }
  };


  // EDIT USER
  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    const url = props.baseUrl + "/api/users/" + profileData.id + "/";
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          first_name: e.target.firstName.value,
          last_name: e.target.lastName.value,
          email: e.target.email.value,
          username: e.target.username.value,
          id: props.currentUser.id,
          password: props.currentUser.password
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
          Accept: "application/json",
        },
        // credentials: "include"
      });
      if (response.status === 200) {
        const updatedUser= await response.json();
        console.log(updatedUser);
        // const findIndex = profileData.findIndex((profile) => profile.id === updatedBill.id)
        console.log(props.allCurrentUsers)
        const copyUsers = [...props.allCurrentUsers];
        copyUsers[0] = updatedUser;
        // Function in order ot pass copyBills to state.
        props.setEditProfileForm(false);
        props.editUser(copyUsers);
        props.textConfirmEnrollment()
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
        <form className="container column" onSubmit={handleSubmit}>
      {/* FIRST NAME */}

      <div className="field">
          <label htmlFor="firstName" className="label">
            First Name:
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="text"
              name="firstName"
              // placeholder="2022223222"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled
            />
          </div>
          </div>

{/* LAST NAME */}

<div className="field">
          <label htmlFor="lastName" className="label">
            Last Name:
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="text"
              name="lastName"
              // placeholder="2022223222"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled
            />
          </div>
          </div>

          {/* EMAIL */}

      <div className="field">
          <label htmlFor="email" className="label">
            Email Address:
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="text"
              name="email"
              // placeholder="2022223222"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          </div>

          {/* USERNAME */}


      <div className="field">
          <label htmlFor="username" className="label">
            Username:
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="text"
              name="username"
              // placeholder="2022223222"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </div>
          </div>




        {/* PHONE NUMBER*/}
        <div className="field">
          <label htmlFor="phoneNumber" className="label">
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

        <div className="field">
          <label htmlFor="password" className="label">
            Password to Confirm:
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="password"
              name="password"
              // placeholder="2022223222"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled
            />
          </div>
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
