import React, {useState}from 'react';
import "./style/signup.css";
import Selectcomp from './Selectcomp';

export default function Signup() {

  // const options=[
  //   {value:0, label:"Admin"},
  //   {value:1, label:"Non-Admin"}
  // ];
  
  const [info,setInfo] = useState({Username:'',Password:'',ConfirmPass:'',Email:'',Fullname:'',Usertype:'',Designation:''});
  const options= ['Admin','Non-Admin'];
  const [error, setErrormsg] = useState(false);


  const save = (e) => {
    e.preventDefault();
    if(info.Username.length===0 || info.Password.length===0
      || info.Email.length===0 || info.Fullname.length===0 
      || info.Designation.length===0 || info.ConfirmPass.length===0){
      setErrormsg(true);
  }
  if (info.Username&&info.Password&&info.Email&&info.Fullname&&info.Designation&&info.ConfirmPass){
      console.log("The form was submitted with the following data:");
      console.log(JSON.stringify(info));

  }
};


    // console.log(`Username: ${info.Username} Password: ${info.Password} Email-id: ${info.Email} FullName: ${info.Fullname}
    // Usertype: ${info.Usertype} Designation: ${info.Designation}`);
   

  
  return (
    <>
     <div className="app">
      <div className="auth-wrapper">
        <div className="auth-inner">
    <div className="formCenter">
      <h3 className="formTitle">Sign Up</h3>
      <br />
      <form className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Username
          </label>
          <input
            type="username"
            id="username"
            
            className="formFieldInput"
            placeholder="Enter your name"
            name="username"
            value={info.Username} 
            onChange={(evt)=>setInfo({...info,Username:evt.target.value})}
          /> 
                <div style={{height: '5px'}}>
                {error&&info.Username.length<=0?
                <div className='label'>Username can't be empty</div>:""}</div>
         
        </div>


        <div className="formField">
          <label className="formFieldLabel" htmlFor="fullname">
            Full Name
          </label>
          <input
            type="name"
            id="name"
            className="formFieldInput"
            placeholder="Enter your full name"
            name="name"
            value={info.Fullname} 
            onChange={(evt)=>setInfo({...info,Fullname:evt.target.value})}/>
            <div style={{height: '5px'}}>
                {error&&info.Fullname.length<=0?
                <div className='label'>Full Name can't be empty</div>:""}</div>
        </div>


        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email address"
            name="email"
            value={info.Email} 
            onChange={(evt)=>setInfo({...info,Email:evt.target.value})}/>
            <div style={{height: '5px'}}>
                {error&&info.Email.length<=0?
                <div className='label'>Email Address can't be empty</div>:""}</div>
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
            value={info.Password} 
            onChange={(evt)=>setInfo({...info,Password:evt.target.value})}/>
            <div style={{height: '5px'}}>
                {error&&info.Password.length<=0?
                <div className='label'>Password can't be empty</div>:""}</div>
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your confirm password"
            name="password"
            value={info.ConfirmPass} 
            onChange={(evt)=>setInfo({...info,ConfirmPass:evt.target.value})}/>
            <div style={{height: '5px'}}>
                {error&&info.ConfirmPass.length<=0?
                <div className='label'>Confirm Password can't be empty</div>:""}</div>
        </div>


        <div className="formField">
          <label className="formFieldLabel" htmlFor="usertype">
            UserType
          </label>
        <Selectcomp type={options}  getValue={(val)=>{setInfo({...info,Usertype:val})}}>

        </Selectcomp>
        <div style={{height: '5px'}}>
                {error&&info.Usertype.length<=0?
                <div className='label'>Select Usertype!</div>:""}</div>
        </div>


        <div className="formField">
          <label className="formFieldLabel" htmlFor="designation">
            Designation
          </label>
          <input
            type="designation"
            id="designation"
            className="formFieldInput"
            placeholder="Enter your designation"
            name="designation"
            value={info.Designation} 
            onChange={(evt)=>setInfo({...info,Designation:evt.target.value})}/>
          <div style={{height: '5px'}}>
                {error&&info.Designation.length<=0?
                <div className='label'>Designation can't be empty</div>:""}</div>
        </div>


        <div className="formField">
          <button className='formFieldButton'  style={{display:"block", margin: "0 auto"}} onClick={save}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
</div>
</>
  )
}
