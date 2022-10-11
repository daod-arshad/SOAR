import { useCallback} from "react";
import { Handle, Position } from "react-flow-renderer";
import Button from "@mui/material/Button";

const handleStyle = { bottom: 6 };

function TextUpdaterNode({ data }) {
  const inputs = []
  console.log(data.values)

  const onChange = useCallback(
    (evt) => {
      for (let i = 0; i < data.playbook.playbook_inputs; i++) {
        console.log(document.getElementById(i).value);
        data.values[i] = document.getElementById(i).value;
      }
    },
    [data.values, data.playbook.playbook_inputs]
  );
  

  for (let i = 0; i < data.playbook.playbook_inputs; i++) {
    inputs.push(<input id={i} key={i} />);
    inputs.push(<br key={1000 - i} />)
    // data.values.push(null)
  }
  
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} id="left" />
      <div>
        <label htmlFor="text">{data.playbook.playbook_display_name}</label>
        {inputs}
        <div className="saveButton">
          <Button
            variant="contained"
            size="small"
            color="success"
            sx={{ m: 1, alignItems: "center" }}
            onClick={onChange}
          >
            Save
          </Button>
        </div>
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