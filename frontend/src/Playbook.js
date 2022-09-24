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

let id = 0;
const getId = () => `dndnode_${id++}`;


function Playbook() {
  
  const nodeTypes = { textUpdater: TextUpdaterNode };
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
//
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)
      // || console.log(edges)
    ),
    [setEdges, edges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    // console.log(edges)
  }, []);

  const onDrop = useCallback(
    (event) => {
      var count = 0
      var startEnd = []
       console.log(edges)
       /* edges.map(item => {
        // console.log(`${item.source}  is connected to ${item.target}`)
        // console.log(item.target);
         edges.map(item1 => {
           if (item == item1) {
             count+=1
           }
         })

         if (count == 1) {
           startEnd.push(item)
         }
         count=0
        
       }) 
      console.log(`The starting and ending nodes are ${startEnd}`) */
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
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
        data: { name: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
      // console.log(edges);
    },
    //
    [reactFlowInstance, edges, setNodes]
    
    
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

export default Playbook;