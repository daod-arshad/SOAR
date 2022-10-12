import { useState} from "react";
import { Handle, Position } from "react-flow-renderer";
import Button from "@mui/material/Button";

const handleStyle = { bottom: 6 };

function TextUpdaterNode({ data }) {
  const [inputs, setInputs] = useState(data.generateArrays)

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
      <div>
        <label htmlFor="text">{data.playbook.playbook_display_name}</label>
        <form onSubmit={handleSubmit}>
          {
            inputs.map((item) => (
            <>
              <input id={item} key={item.toString()} />
              <br key={1000-item} />
            </>
          ))
          }
          <div className="saveButton">
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="success"
              sx={{ m: 1, alignItems: "center" }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
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