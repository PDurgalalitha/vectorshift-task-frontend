// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import { NODE_TYPES, OUTPUT_TYPES } from "../../constants";
import OutputIcon from "@mui/icons-material/Output";
import BaseNode from "../../components/baseNode";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
});

{
  /* 
    Output Node component to define the final destination of processed data.
    Uses BaseNode Component
    Allows users to name the output variable and specify the format (Text, Image, etc.).

    Props:
    - id: (String) Unique identifier provided by React Flow.
    - data: (Object) Initial state containing output name and selected type.
  */
}
export const OutputNode = ({ id, data }) => {
  console.log(data);
  const { updateNodeField } = useStore(selector, shallow);

  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, "nodeName", e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, "outputType", e.target.value);
  };

  return (
    <BaseNode
      isShowAppendix={true}
      node={NODE_TYPES.customOutput}
      icon={<OutputIcon />}
      caption={"output data of different types from your workflow"}
      inputs={[{ id: `${id}-target-1` }]}
      nodeId={id}
    >
      <div className="flex flex-col p-2 gap-2 text-sm">
        <div>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="bg-violet-100 p-1 rounded-lg text-center text-sm w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Type</label>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="border-2 border-gray-100 rounded p-1"
          >
            {OUTPUT_TYPES.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
