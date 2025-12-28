// toolbar.js

import { DraggableNode } from "../draggableNode";
import { NODES_LIST } from "../../constants";

{
  /* 
    Toolbar component that displays a collection of draggable nodes.
    Iterates through the NODES_LIST constant to populate the sidebar/header.
  */
}
export const ToolBar = () => {
  return (
    <div className="p-3">
      <div className="mt-[20px] flex flex-wrap gap-[10px]">
        {NODES_LIST?.map((item) => (
          <DraggableNode type={item?.type} label={item?.label} />
        ))}
      </div>
    </div>
  );
};
