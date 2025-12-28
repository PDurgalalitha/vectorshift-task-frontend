// toolbar.js

import { DraggableNode } from "../DraggableNode";
import { NODES_LIST } from "../../constants";
export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {NODES_LIST?.map((item) => (
          <DraggableNode type={item?.type} label={item?.label} />
        ))}
      </div>
    </div>
  );
};
