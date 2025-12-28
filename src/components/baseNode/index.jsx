// import { NodeAppendix } from "@/components/node-appendix";
import DeleteIcon from "@mui/icons-material/Delete";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";

const selector = (state) => ({
  deleteNode: state.deleteNode,
});
{
  /* 
    Reusable BaseNode component to create consistent custom nodes across the pipeline.
    
    Props:
    - node: (String) The title/name of the node displayed in the header.
    - icon: (ReactElement) Material UI or SVG icon to represent the node type visually.
    - caption: (String) Short description text displayed below the node title.
    - inputs: (Array) Configuration for target handles [{id, position}].
    - outputs: (Array) Configuration for source handles [{id, position}].
    - nodeId: (String) Unique identifier required for state actions like deletion.
    - children: (ReactNode) Inner UI components (inputs, text, etc.) specific to the node.
  */
}

const BaseNode = ({
  node,
  icon,
  caption,
  inputs = [],
  outputs = [],
  nodeId,
  children,
}) => {
  const { deleteNode } = useStore(selector, shallow);

  //delete the node
  const handleDeleteNode = (e) => {
    e.stopPropagation();
    deleteNode(nodeId);
  };
  return (
    <div className="border-2 border-blue-200 rounded-2xl max-w-70 pb-2">
      {/* Node Header */}
      <div className="bg-sky-100 p-2 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <span className="text-lg">
            {" "}
            {icon ? icon : ""} {` `} {node ? node : ""}
          </span>
          <DeleteIcon
            onClick={(e) => handleDeleteNode(e)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm">{caption}</p>
      </div>
      {/* Content Area */}
      {children}

      {/* Dynamic handles */}
      {inputs?.map((h, i) => {
        const topPosition = `${((i + 1) * 100) / (inputs.length + 1)}%`;
        return (
          <Handle
            key={h.id}
            type="target"
            position={h.position || Position.Left}
            id={h.id}
            className="w-3 h-3 !bg-slate-400 border-2 border-white hover:!bg-blue-500 transition-colors"
            style={{ top: topPosition }}
          />
        );
      })}
      {outputs?.map((h, i) => {
        const topPosition = `${((i + 1) * 100) / (outputs.length + 1)}%`;
        return (
          <Handle
            key={h.id}
            type="source"
            position={h.position || Position.Right}
            id={h.id}
            className="w-3 h-3 !bg-slate-400 border-2 border-white hover:!bg-blue-500 transition-colors"
            style={{ top: topPosition }}
          />
        );
      })}
    </div>
  );
};

export default BaseNode;
