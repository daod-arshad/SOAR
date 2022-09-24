import React from "react";
import "./Sidebar.css"


function Sidebar (){
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "textUpdater")}
        draggable
      >
        <label htmlFor="text">Playbook</label>
        {/* <TextUpdaterNode/> */}
      </div>
    </aside>
  );
};
export default Sidebar