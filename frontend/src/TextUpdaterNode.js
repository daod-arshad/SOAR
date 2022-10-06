import { useCallback, } from "react";
import { Handle, Position } from "react-flow-renderer";
// import $ from "jquery";

const handleStyle = { bottom: 6 };

function TextUpdaterNode({ data }) {
  
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
    
    data.value.push(evt.target.value)
  }, [data.value]);
  const inputs = []

  for (let i = 0; i < data.playbook.playbook_inputs; i++) {
    inputs.push(<input key={i} onChange={onChange} />);
    inputs.push(<br key={Math.random()} />)
  }
  // console.log(inputs)
  
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} id="left" />
      <div>
        <label htmlFor="text">{data.playbook.playbook_display_name}</label>
        {
          inputs
        }
      </div>
      <Handle type="source" position={Position.Right} id="right" style={handleStyle}/>
    </div>
  );
}

export default TextUpdaterNode;