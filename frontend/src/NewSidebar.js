import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./style/custom.scss";
import axios from "./axios.js"



function NewSidebar() {
  const [windowsPlaybooks, setwindowsPlaybooks] = useState([])
  const [linuxPlaybooks, setlinuxPlaybooks] = useState([]);
  const [otherPlaybooks, setotherPlaybooks] = useState([]);
  useEffect(() => {
    axios.get("/windowsPlaybooks/find").then((response) => {
      console.log(response.data);
      setwindowsPlaybooks(response.data)
    },[]);
    axios.get("/linuxPlaybooks/find").then((response) => {
      console.log(response.data);
      setlinuxPlaybooks(response.data);
    },[]);
    axios.get("/otherPlaybooks/find").then((response) => {
      console.log(response.data);
      setotherPlaybooks(response.data);
    });
  }, []);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

    return (
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Playbooks</MenuItem>
          <SubMenu title="Windows">
            {windowsPlaybooks.map((playbook) => (
              <MenuItem key={playbook.id}>
                <div
                  className="dndnode"
                  onDragStart={(event) =>
                    onDragStart(event, JSON.stringify(playbook))
                  }
                  draggable
                >
                  <label htmlFor="text">{playbook.playbook_display_name}</label>
                </div>
              </MenuItem>
            ))}
          </SubMenu>

          <SubMenu title="Linux">
            {linuxPlaybooks.map((playbook) => (
              <MenuItem key={playbook.id}>
                <div
                  className="dndnode"
                  onDragStart={(event) =>
                    onDragStart(event, JSON.stringify(playbook))
                  }
                  draggable
                >
                  <label key={playbook.id} htmlFor="text">
                    {playbook.playbook_display_name}
                  </label>
                </div>
              </MenuItem>
            ))}
          </SubMenu>

          <SubMenu title="Other">
            {otherPlaybooks.map((playbook) => (
              <MenuItem key={playbook.id}>
                <div
                  className="dndnode"
                  onDragStart={(event) =>
                    onDragStart(event, JSON.stringify(playbook))
                  }
                  draggable
                >
                  <label key={playbook.id} htmlFor="text">
                    {playbook.playbook_display_name}
                  </label>
                </div>
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
      </ProSidebar>
    );
};
export default NewSidebar;
