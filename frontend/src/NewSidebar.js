import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./style/custom.scss";


function NewSidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

    return (
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Playbooks</MenuItem>
          <SubMenu title="Windows">
            <MenuItem>
              <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "textUpdater")}
                draggable
              >
                <label htmlFor="text">Playbook</label>
                {/* <TextUpdaterNode/> */}
              </div>
            </MenuItem>
          </SubMenu>

          <SubMenu title="Linux">
            <MenuItem>
              <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "textUpdater")}
                draggable
              >
                <label htmlFor="text">Playbook</label>
                {/* <TextUpdaterNode/> */}
              </div>
            </MenuItem>
          </SubMenu>

          <SubMenu title="Other">
            <MenuItem>
              <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "textUpdater")}
                draggable
              >
                <label htmlFor="text">Playbook</label>
                {/* <TextUpdaterNode/> */}
              </div>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    );
};
export default NewSidebar;
