import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = { bottom: 6 };

function TextUpdaterNode({ data }) {
  
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
    // window.name=evt.target.value
    data.value.push(evt.target.value)
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} id="left" />
      <div>
        <label htmlFor="text">{data.playbook.playbook_display_name}</label>
        
        <input id="text" name="text" onChange={onChange} />
        <br></br>
        <input id="text" name="text" onChange={onChange} />
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