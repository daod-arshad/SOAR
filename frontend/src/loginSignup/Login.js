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
        axios
          .post("/user/login", {
            username: name, password: password
          })
            .then((response) => {
                    // console.log("Login alert");
                // console.log(response.data);
                // const user = jwt(response.data)
                // console.log(user)
                localStorage.setItem("token", response.data)
                navigate("/playbook")
      
            }, [])
          .catch(err => console.log("Incorrect Username or Password"));
    }
  };

  //    //Validate Password Function
  // const validate = (password) => {

  //   if (validator.isStrongPassword(password, {
  //     minLength: 8, minLowercase: 1,
  //     minUppercase: 1, minNumbers: 1, minSymbols: 1
  //   })) {
  //     setErrorMessage('')
  //     setPassword(password);
  //   } else {
  //     setErrorMessage('Is Not Strong Password')
  //   }
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
