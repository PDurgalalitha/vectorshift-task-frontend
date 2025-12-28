// inputNode.js

import { useState, useCallback, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { NODE_TYPES, INPUT_TYPES } from "../../constants";
import InputIcon from "@mui/icons-material/Input";
import BaseNode from "../../components/baseNode";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
});

{
  /* 
    Input Node component to capture user data at the start of a pipeline.
    Uses BaseNode component
    Allows users to define a variable name and select a data type (Text, number).

    Props:
    - id: (String) Unique identifier provided by React Flow.
    - data: (Object) Initial state containing input name and selected type.
  */
}
export const InputNode = ({ id, data }) => {
  const { updateNodeField } = useStore(selector, shallow);
  // Local state for immediate UI feedback
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  useEffect(() => {
    updateNodeField(id, "nodeName", currName);
    updateNodeField(id, "inputType", inputType);
  }, []);

  //
  const handleNameChange = useCallback((e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
    updateNodeField(id, "nodeName", newValue);
  }, []);
  const handleTypeChange = useCallback((e) => {
    setInputType(e.target.value);
    updateNodeField(id, "inputType", e.target.value);
  }, []);
  const handleDelete = () => {
    // delete the node
    // updateNodeField(id);
  };
  return (
    <BaseNode
      isShowAppendix={true}
      node={NODE_TYPES.customInput}
      icon={<InputIcon />}
      caption={"pass data of different types into your workflow"}
      outputs={[{ id: `${id}-source-1` }]} // Input nodes typically only have a source (output) handle
      nodeId={id}
    >
      <div className="flex flex-col p-2 gap-2 text-sm">
        {/* Variable Name Input */}
        <div>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="bg-violet-100 p-1 rounded-lg text-center text-sm w-full"
          />
        </div>
        {/* Data Type Selector */}
        <div className="flex flex-col gap-1">
          <label>Type</label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="border-2 border-gray-100 rounded p-1"
          >
            {INPUT_TYPES.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
