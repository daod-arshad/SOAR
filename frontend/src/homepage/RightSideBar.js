import React, { useEffect, useState } from "react";
import {
  Icon,
  Menu,
  Sidebar,
} from "semantic-ui-react";
import Button from "@mui/material/Button";
import "./style/RightSidebar.css"


const VerticalSidebar = ({ animation, direction, visible, playbooks }) => {
  for (let i = 0; i < playbooks.length; i++){
    console.log(playbooks[i].data.playbook)
  }
    const [Visibility, setVisibility] = useState(Boolean);
  useEffect(() => {
      setVisibility(visible)
    },[visible])
    return (
      <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        icon="labeled"
        inverted
        vertical
        visible={Visibility}
        // width="wide"
      >
        <Menu.Item as="a">
          <label className="LabelForInputs">Set Rule ID</label>
          <input className="inputForTrigger" placeholder="rule.id" />
          <br className="space" />
        </Menu.Item>

        {playbooks.map((item) => (
          // console.log(item.data.playbook)
          <Menu.Item>
            <label className="playbookTriggerTitle">{item.data.playbook.playbook_display_name}</label>
            {item.data.generateArrays.map((item2) => (
              <React.Fragment>
                <label className="LabelForInputs">
                  {item.data.playbook.playbook_labels[item2]}
                </label>
                <input
                  className="inputForTrigger"
                  placeholder="Relevant Field"
                />
              </React.Fragment>
              // console.log(item.data.playbook)
            ))}
          </Menu.Item>
        ))}

        <br />
        <Button style={{ background: "#431d2e" }} variant="contained">
          Save
        </Button>
        <Button
          style={{ background: "#431d2e" }}
          variant="contained"
          onClick={() => {
            setVisibility(false);
            // console.log(Visibility)
          }}
        >
          Cancel
        </Button>
      </Sidebar>
    );
};

export default VerticalSidebar;
