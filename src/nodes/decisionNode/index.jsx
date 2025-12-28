// inputNode.js

import { NODE_TYPES } from "../../constants";
import BaseNode from "../../components/baseNode";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";

{
  /* 
    Sample Decision Node component.
    Uses one input to evaluate conditions and provides two outputs.

    Props:
    - id: (String) Unique identifier passed by React Flow.
    - data: (Object) Internal node state containing labels or logical values.
  */
}
export const DecisonNode = ({ id, data }) => {
  return (
    <BaseNode
      node={NODE_TYPES.customDecision}
      icon={<PsychologyAltIcon />}
      caption={"decision"}
      inputs={[{ id: `${id}-target-1` }]}
      outputs={[{ id: `${id}-source-1` }, { id: `${id}-source-2` }]}
      nodeId={id}
    >
      <div className="p-2">This is a decision node</div>
    </BaseNode>
  );
};
