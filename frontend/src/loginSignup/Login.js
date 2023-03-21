import React, { useState } from "react";
import "./style/relogin.css"
import axios from "../axios.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from "react-router-dom";


export default function Login({updatedUser},{children}) {
  const [error, setErrormsg] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const isAuthenticated = () => {
    // Check if the user is authenticated by looking for a session variable
    return localStorage.getItem('User') !== null;
  };

  let navigate = useNavigate(); 
  //functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || password.length === 0) {
      setErrormsg(true);
      window.alert("Please fill out the input field to proceed.");
    }
    else{
        console.log("The form was submitted with the following data:");
        console.log("username: " + name, "password: " + password);
   
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          axios.defaults.withCredentials = true;
          axios
            .post("/user/login", {
              username: name, password: password
            }).then((response)=>{
              updatedUser(response.data);
                   
              // setLoggedIn(true);
              navigate("/dashboard")
            },[])
          
      .catch(err => alert('Incorrect username or password!'));
      
      
      
  }}

  React.useEffect(() => {
    if (isAuthenticated()) {
      window.history.back();
      // (location.state?.from || '/');
    }
  }, [location.state]);



  return (
    <>
      {!isAuthenticated() && (
    <div className="App">
    <div className="appAside" />
    <div className="appForm">
    <div className="formCenter">
    <h3 className="formTitle">Sign In</h3>
    <form className="formFields" onSubmit={handleSubmit}>
      <div className="form_Field" >

        <label className="formField_Label" htmlFor="name">
          Username
        </label>
        <div className="form-outline">
          <input type="username" id="formWhite" className="form_control" 
            onChange={(e) => setName(e.target.value)}/>
        </div>
        <div style={{ height: "40px" }}>
              {error && name.length <= 0 ? (
                <div className="label">Username can't be empty</div>
              ) : (
                ""
              )}
        </div>
      </div>
     

    <div className="form_Field">
      <label className="formField_Label" htmlFor="password">
          Password
      </label>
      <div className="form-outline">     
    <input type="password" id="password" className="form_control"
      onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <br />
            <div style={{ height: "45px" }}>
              {error && password.length <= 0 ? (
                <div className="label">Password can't be empty</div>
              ) : (
                ""
              )}
        </div>
   </div>
     
        <div className="form_Field">
          <button
              className="formFieldButton"
              style={{ display: "block", margin: "0 auto" }}
              onClick={handleSubmit}>
              Sign In
          </button>
        </div>

    </form>
  </div>
  </div>
  </div>)}
</>
  );
  
}


