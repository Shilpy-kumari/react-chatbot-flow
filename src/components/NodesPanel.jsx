export default function NodesPanel() {
  const onDragStart = (event, type) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      <h3>Nodes Panel</h3>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "textNode")}
        style={{
          padding: 10,
          border: "1px solid black",
          cursor: "grab",
          marginTop: 10,
        }}
      >
        Message Node
      </div>
    </div>
  );
}