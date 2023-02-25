import React, { useState,useRef ,useCallback} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
} from "react-flow-renderer";
import "./style/Playbook.css";
import TextUpdaterNode from "./TextUpdaterNode.js";
import "./style/text-updater-node.css";
import NewSidebar from "./NewSidebar";
import Button from "@mui/material/Button";
import axios from "../axios.js";
import ResponsiveAppBar from "./AppBar.js";
// app.use(cors({
//   origin: ["http://localhost:3000"],
//   // methods:["GET","POST"],
//   credentials: true
// }))
const initialNodes = [
  /*
  {
    id: "1",
    type: "textUpdater",
    data: { label: "Custom Node" },
    position: { x: 20, y: 5 },
  }, 
  */
];


const rfStyle = {
  backgroundColor: "#f8f8f8",
};

window.name = "Dawood"
const nodeTypes = { textUpdater: TextUpdaterNode };
let id = 0;
const getId = () => `dndnode_${id++}`;


function Playbook({updatedUser}) {
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes,] = useNodesState(initialNodes);
  const [edges, setEdges,] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  


  

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)
      //  || console.log(edges)
    ),
    [setEdges]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, [setEdges]);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    // console.log(edges)
  }, []);

  const onDrop = useCallback(
    (event) => {
      
      // findSequence(edges,nodes)


      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      /* var recievedData = event.dataTransfer.getData("application/reactflow");
      recievedData = JSON.parse(recievedData);
      const playbookInformation = recievedData[0] */
      const playbookInformation = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const type = "textUpdater"

      // console.log(type)
      
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        console.log("Invalid nodes")
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const dataArray = []
      for (let i = 0; i < playbookInformation.playbook_inputs; i++){
        dataArray.push(null)
      }
      
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          playbook: playbookInformation, values: dataArray,
          generateArrays: Array.from(Array(Number(playbookInformation.playbook_inputs)).keys()),
          retrievedData:null
        },
      };

      setNodes((nds) => nds.concat(newNode));
      // console.log(edges);
    },
    //
    [reactFlowInstance, setNodes,]
    
    
  );


  
  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <div className="body">
        <div className="dndflow">
          <ReactFlowProvider>
            <NewSidebar />
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView={false}
                nodeTypes={nodeTypes}
                style={rfStyle}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
              >
                <Controls />
                <div className="save__controls">
                  <Button
                    variant="contained"
                    onClick={() => runPlaybooks(edges, nodes)}
                  >
                    Execute
                  </Button>
                </div>
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

function findSequence(edges, nodes) {
  var count = 0;
  var startEnd = [];
  var startAndEnd = [];
  var pointer;
  var sequence = [];

  edges.forEach((item) => {
    startEnd.push(item.source);
    startEnd.push(item.target);
  });
  startEnd.forEach((item) => {
    startEnd.forEach((duplicateItem) => {
      if (item === duplicateItem) {
        count += 1;
      }
    });
    if (count === 1) {
      startAndEnd.push(item);
    }
    count = 0;
  });

  edges.forEach((item2) => {
    startAndEnd.forEach((item3) => {
      if (item2.source === item3) {
        pointer = item3;
      }
    });
  });

  if (edges.length === 0) {
    console.log("There are no connections");

  } else if (edges.length === 1) {
    // console.log("There are only 2 nodes");
    edges.forEach((item) => {
      sequence.push(item.source);
      sequence.push(item.target);
    });
  } else {
    sequence.push(pointer);
    var edgesCopy = [];
    edges.forEach((item) => {
      edgesCopy.push(item);
    });
    for (var i = 0; i < edges.length; i++) {
      edges.forEach((item) => {
        if (item.source === pointer) {
          sequence.push(item.target);
          pointer = item.target;
        }
      });
    }
  }
   return sequence;

}

function runPlaybooks(edges, nodes) {
  const playbooks = ["ansible-runner.py"];
  var finalSequence = findSequence(edges, nodes)
  console.log(finalSequence)
  finalSequence.forEach((nodeInSequence) => {
    nodes.forEach((node) => {
      if (node.id === nodeInSequence) {
        playbooks.push(
          JSON.stringify({
            name: node.data.playbook.playbook_name,
            data: {
              display_name: node.data.playbook.playbook_display_name,
              path: node.data.playbook.playbook_path,
              vault_pass: node.data.playbook.playbook_vault_password_path,
              module_path: node.data.playbook.playbook_module_path,
              parameters: node.data.playbook.playbook_parameters,
              values: node.data.values,
            },
          })
        );
        // console.log(node.data.playbook.playbook_display_name);
        // console.log(node.data.values);
      }
    });
  })
  
  if (finalSequence.length > 0) {
    axios
      .post("/recievePlaybook", {
        playbooks: playbooks,
      })
      .then((response) => {
        console.log("REcieved Data")
        console.log(response.data);
      }, []);
  }
  
}


  
  
  
export default Playbook;