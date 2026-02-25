import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "./components/TextNode";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";

const nodeTypes = {
  textNode: TextNode,
};

const getId = () => `node_${Date.now()}_${Math.random()}`;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => {
  setEdges((eds) => {
    const sourceHasEdge = eds.some(
      (edge) => edge.source === params.source
    );

    if (sourceHasEdge) {
      alert("Only one outgoing connection allowed from a node");
      return eds;
    }

    return addEdge(params, eds);
  });
}, []);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
  event.preventDefault();

  const type = event.dataTransfer.getData("application/reactflow");
  if (!type) return;

  const reactFlowBounds = event.currentTarget.getBoundingClientRect();

  const position = {
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  };

  const newNode = {
    id: getId(),
    type: "textNode",
    position,
    data: { text: "New Message" },
  };

  setNodes((nds) => [...nds, newNode]);
};

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  // Save validation
  const handleSave = () => {
  if (nodes.length === 0) {
    alert("Add at least one node");
    return;
  }

  const nodesWithoutIncoming = nodes.filter((node) => {
    return !edges.some((edge) => edge.target === node.id);
  });

  if (nodes.length > 1 && nodesWithoutIncoming.length > 1) {
    alert("Error: More than one node has no incoming connection");
    return;
  }

  alert("Flow Saved Successfully!");
  console.log({ nodes, edges });
};
  return (
    <div className="app">
      {/* Left Panel */}
      <div className="sidebar">
        {!selectedNode ? (
          <NodesPanel />
        ) : (
          <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} />
        )}
      </div>

      {/* Flow Area */}
      <div className="flow-wrapper">
        <button
          onClick={handleSave}
          style={{ position: "absolute", right: 20, top: 20, zIndex: 10 }}
        >
          Save
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onPaneClick={() => setSelectedNode(null)}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}