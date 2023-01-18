import React, { useState } from "react";
import "./style/login.css"
import axios from "../axios.js"
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [error, setErrormsg] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
let navigate = useNavigate(); 
  //functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || password.length === 0) {
      setErrormsg(true);
    }else{
        console.log("The form was submitted with the following data:");
        console.log("username: " + name, "password: " + password);
        // var dataaa = [{"username": name},{"password":password}]
        // console.log(dataaa)
        // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataaa), 'secret key 123').toString();
        // console.log(ciphertext)

        

          axios.defaults.withCredentials = true;
          axios
            .post("/user/login", {
              username: name, password: password
            },{
              withCredentials: true,
            }).then((response)=>{
              
              axios.defaults.headers.common['x-auth-token'] = response.data;
              console.log("data: "+ response.data);
              console.log(response)
              // const previous = {response};
              // const databar = response;
              
          
              navigate("/playbook")
            },[])
          
      .catch(err => console.log("Incorrect Username or Password"));
      
      
      
  }}
  // const LoggedIn=()=>{
  //   let response= localStorage.getItem("data");
  //   if (response != null) {
  //   console.log("logged in");
  //   return true;}
  //   else {
  //     console.log("not login");
  //     return false;}
  // }

  return (
    <>
    <div className="app">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div className="formCenter">
            <h3 className="formTitle">Sign In</h3>
            <br />
        <form className="formFields" onSubmit={handleSubmit}>
          <div className="formFields">
            <label className="formFieldLabel" htmlFor="name">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="formFieldInput"
              placeholder="Enter your name"
              name="username"
              //value={state.email}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <div style={{ height: "40px" }}>
              {error && name.length <= 0 ? (
                <div className="label">Username can't be empty</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div style={{ height: "45px" }}>
              {error && password.length <= 0 ? (
                <div className="label">Password can't be empty</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="formField">
            <button
              className="formFieldButton"
              style={{ display: "block", margin: "0 auto" }}
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</>
  );
  
}


