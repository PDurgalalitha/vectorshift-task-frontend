import BaseNode from "../../components/baseNode";
import { NODE_TYPES } from "../../constants";
import TransformIcon from "@mui/icons-material/Transform";

{
  /* 
    Sample Transform Node component to convert JSON objects into stringified format.
    Useful for data serialization and preparing payloads for output or display.

    Props:
    - id: (String) Unique identifier provided by React Flow.
    - data: (Object) Internal state containing processing values or results.
  */
}
export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      isShowAppendix={true}
      node={NODE_TYPES.transformNode}
      icon={<TransformIcon />}
      caption={"Data Converter"}
      inputs={[{ id: `${id}-target-1` }]}
      outputs={[{ id: `${id}-source-1` }]}
      nodeId={id}
    >
      <div className="p-2">This is a data transformation Node</div>
    </BaseNode>
  );
};
