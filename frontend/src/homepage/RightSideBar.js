import React, { useState } from "react";
import {
  Icon,
  Menu,
  Sidebar,
} from "semantic-ui-react";
import Button from "@mui/material/Button";

const VerticalSidebar = ({ animation, direction, visible, playbooks }) => {
    var x = visible
    const [Visibility, setVisibility] = useState(x)
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
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="gamepad" />
          Games
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="camera" />
          Channels
        </Menu.Item>
            <Button
                style={{ background: "#431d2e" }}
                variant="contained"
                onClick={() => {
                    setVisibility(false)
                    console.log(Visibility)
                }} 
        >
          Cancel
        </Button>
      </Sidebar>
    );
};

export default VerticalSidebar;
