import { Handle, Position } from "reactflow";

export default function TextNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #333",
        borderRadius: 5,
        background: "#fff",
        width: 150,
      }}
    >
      <strong>Send Message</strong>
      <div>{data.text}</div>

      {/* Target handle (multiple allowed) */}
      <Handle type="target" position={Position.Left} />

      {/* Source handle (one outgoing) */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}