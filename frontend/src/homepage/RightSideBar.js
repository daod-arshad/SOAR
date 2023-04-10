import React, { useEffect, useState } from "react";
import {
  Menu,
  Sidebar,
} from "semantic-ui-react";
import Button from "@mui/material/Button";
import "./style/RightSidebar.css"
import axios from "../axios.js"

const VerticalSidebar = ({ animation, direction, visible, nodes, sequence }) => {
  // for (let i = 0; i < playbooks.length; i++){
  //   console.log(playbooks[i].data.playbook)
  // }
  
  const [ruleid, setRuleid] = useState(Number)
  // console.log(sequence)
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
          <input
            className="inputForTrigger"
            placeholder="rule number"
            onChange={(evt) => setRuleid(evt.target.value)}
          />
          <br className="space" />
        </Menu.Item>

        {nodes.map((item) => (
          // console.log(item.data.playbook)
          <Menu.Item>
            <label className="playbookTriggerTitle">
              {item.data.playbook.playbook_display_name}
            </label>
            {item.data.generateArrays.map((item2) => (
              <React.Fragment>
                <label className="LabelForInputs">
                  {item.data.playbook.playbook_labels[item2]}
                </label>
                <input
                  className="inputForTrigger"
                  placeholder="Relevant Field"
                  onChange={(evt) =>
                    (item.data.values[item2] = evt.target.value)
                  }
                />
              </React.Fragment>
              // console.log(item.data.playbook)
            ))}
          </Menu.Item>
        ))}

        <br />
        <Button
          style={{ background: "#431d2e" }}
          variant="contained"
          onClick={() => {
            // for (let i = 0; i < nodes.length; i++){
            //   console.log(nodes[i].data.values)
            // }
            savePlaybooks(nodes, sequence, ruleid);
          }}
        >
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


function savePlaybooks(nodes, sequence, ruleID) {
  const date = new Date();
  const playbooksToBeExecuted = ["ansible-runner.py"];
  // var finalSequence = findSequence(edges, nodes);
  // console.log(finalSequence);
  console.log("inside function")
  console.log(sequence)
  sequence.forEach((nodeInSequence) => {
    console.log("inside loop")
    nodes.forEach((node) => {
      if (node.id === nodeInSequence) {
        playbooksToBeExecuted.push(
          {
            name: node.data.playbook.playbook_name,
            data: {
              display_name: node.data.playbook.playbook_display_name,
              path: node.data.playbook.playbook_path,
              vault_pass: node.data.playbook.playbook_vault_password_path,
              module_path: node.data.playbook.playbook_module_path,
              parameters: node.data.playbook.playbook_parameters,
              values: node.data.values,
            },
          }
        );
        // console.log(node.data.playbook.playbook_display_name);
        // console.log(node.data.values);
      }
    });
  });

  //const headers = { 'Authorization': `Bearer ${token}` };
  if (sequence.length > 0) {
    // console.log(ruleID)
    axios
      .post("/triggers/save", {
        date: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
        time: date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
        ruleId: ruleID,
        isEnabled: true,
        nodes: playbooksToBeExecuted,
      })
      .then((response) => {
        console.log(response.data);
      }, []);
  }
}


export default VerticalSidebar;
