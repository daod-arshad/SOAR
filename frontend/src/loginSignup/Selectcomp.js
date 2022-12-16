import React from 'react';
import "./style/signup.css";

const Selectcomp = (props) => {
    //console.log(`output ${props.type}`);
    const handleChange = (event) => {
      // We will pass the selected value to prop's object getValue() method
      props.getValue(
          event.target.value
          );
    }
  return (
    <div className="form-group">
    <select className="form-select" onChange={handleChange}  >
        {props.type.map((c,idx)=>(
            <option key={idx} value={c}>{c}</option>
        ))}
   
    </select>
    
     
    </div>
  )
}
export default Selectcomp 