import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = { bottom: 6 };

function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} id="top" />
      <div>
        <label htmlFor="text">{ data.name }</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle}/>
    </div>
  );
}

export default TextUpdaterNode;
