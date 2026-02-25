import { useState, useEffect } from "react";

export default function SettingsPanel({ selectedNode, setNodes }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text);
    }
  }, [selectedNode]);

  const updateNode = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, text } }
          : node
      )
    );
  };

  if (!selectedNode) return null;

  return (
    <div>
      <h3>Settings Panel</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={updateNode} style={{ marginTop: 10 }}>
        Update
      </button>
    </div>
  );
}