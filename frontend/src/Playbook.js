import React, { useState, useRef, useCallback } from "react";
import ReactFlow, { ReactFlowProvider,addEdge,useNodesState,useEdgesState, Controls,} from "react-flow-renderer";
import "./style/Playbook.css";
import TextUpdaterNode from "./TextUpdaterNode.js";
import "./style/text-updater-node.css";
import NewSidebar from "./NewSidebar";

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
window.name = "Dawood"
const nodeTypes = { textUpdater: TextUpdaterNode };
let id = 0;
const getId = () => `dndnode_${id++}`;


function Playbook() {
  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
//
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)
      // || console.log(edges)
    ),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    // console.log(edges)
  }, []);

  const onDrop = useCallback(
    (event) => {
      
      findSequence(edges,nodes)


      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      var recievedData = event.dataTransfer.getData("application/reactflow");
      recievedData = JSON.parse(recievedData);
      const playbookInformation = recievedData[0]
      const type = recievedData[1]

      // console.log(type)
      
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        console.log("Invalid nodes")
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { playbook: playbookInformation, value:[] },
      };

      setNodes((nds) => nds.concat(newNode));
      // console.log(edges);
    },
    //
    [reactFlowInstance, edges, setNodes, nodes]
    
    
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <NewSidebar/>
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
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

function findSequence(edges, nodes) {
  var count = 0;
  var startEnd = [];
  var startAndEnd = [];
  var pointer;
  var sequence = [];
  if (nodes.length > 1) {
    nodes.map((item) => {
      console.log(item.data.value);
    });
  }
  console.log(edges);
  edges.map((item) => {
    startEnd.push(item.source);
    startEnd.push(item.target);
  });
  // console.log(startEnd)
  startEnd.map((item) => {
    startEnd.map((duplicateItem) => {
      if (item === duplicateItem) {
        count += 1;
      }
    });
    if (count === 1) {
      startAndEnd.push(item);
    }
    count = 0;
  });

  edges.map((item2) => {
    startAndEnd.map((item3) => {
      if (item2.source === item3) {
        pointer = item3;
        // console.log(`Starting node is ${pointer}`)
      }
    });
  });

  if (edges.length === 0) {
    console.log("There is only one Node");
  } else if (edges.length === 1) {
    console.log("There are only 2 nodes");
  } else {
    sequence.push(pointer);
    for (var i = 0; i < edges.length; i++) {
      edges.map((item) => {
        if (item.source === pointer) {
          sequence.push(item.target);
          pointer = item.target;
          // console.log(`The next node is ${pointer}`)
        }
      });
    }
    console.log(sequence);
  }
      

}

export default Playbook;