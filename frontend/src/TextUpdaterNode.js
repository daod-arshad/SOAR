import React, { useState} from "react";
import { Handle, Position } from "react-flow-renderer";
import Button from "@mui/material/Button";

const handleStyle = { bottom: 6 };

function TextUpdaterNode({ data }) {
  const [showForm, setShowForm] = useState(true);
  const [buttonText, setButtonText] = useState("Save");
  // const [inputs, setInputs] = useState(data.generateArrays)


  var handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < data.playbook.playbook_inputs; i++) {
      console.log(event.target[i].value);
      data.values[i] = event.target[i].value;
    }
    
  };
  

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} id="left" />
      <label htmlFor="text">{data.playbook.playbook_display_name}</label>
      <form onSubmit={handleSubmit}>
        {showForm &&
          data.generateArrays.map((item) => (
            <React.Fragment key={item}>
              <input />
              <br />
            </React.Fragment>
          ))}
        <div className="saveButton">
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="success"
            sx={{ m: 1, alignItems: "center" }}
          >
            {buttonText}
          </Button>
        </div>
      </form>
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={handleStyle}
      />
    </div>
  );
}

export default TextUpdaterNode;