// textNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "../../components/baseNode";
import { NODE_TYPES } from "../../constants";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import Chip from "@mui/material/Chip";
import { checkParenthesis } from "../../utils";

const selector = (state) => ({
  getNodesByType: state.getNodesByType,
  updateNodeField: state.updateNodeField,
  onConnect: state.onConnect,
});

{
  /* 
    Text Node component that supports dynamic variable injection.
    Automatically detects '{{' triggers to suggest existing input nodes 
    and establishes automated edges upon selection.

    Props:
    - id: (String) Unique identifier provided by React Flow.
    - data: (Object) Initial state containing the node's text content.
  */
}
export const TextNode = ({ id, data }) => {
  const { getNodesByType, updateNodeField, onConnect } = useStore(
    selector,
    shallow
  );
  const [currText, setCurrText] = useState(data?.text || "");
  const [inputNodes, setInputNodes] = useState([]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, "text", e.target.value);

    // Trigger variable suggestion logic if double brackets are detected
    if (checkParenthesis(e.target.value)) {
      const input = getNodesByType("customInput");
      setInputNodes(input);
    } else {
      setInputNodes([]);
    }
  };

  const handleSelect = (node) => {
    if (currText.length == 0) return;
    // Logic to find the starting index of the bracket to replace with variable name
    let index = currText.length - 1;
    for (let i = currText.length - 1; i >= 0; i--) {
      if (currText[i] == "{") {
        break;
      } else {
        index = i;
      }
    }
    const updatedText =
      currText.slice(0, index + 1) + node?.data?.nodeName + "}}";
    // Clear suggestions and update text
    setInputNodes([]);
    setCurrText(updatedText);
    updateNodeField(id, "text", updatedText);
    // Automatically create a connection between the selected variable and this node
    const newEdge = {
      id: `${id}-${node?.id}`,
      source: node?.id,
      target: id,
    };
    onConnect(newEdge);
  };

  return (
    <BaseNode
      isShowAppendix={true}
      node={NODE_TYPES.text}
      icon={<TextSnippetIcon />}
      caption={"access the varaibles by starting with {{"}
      inputs={[{ id: `${id}-target-1` }]}
      outputs={[{ id: `${id}-source-1` }]}
      nodeId={id}
    >
      <div className="flex flex-col p-2 gap-2 text-sm">
        <div className="flex flex-col gap-1 overflow-auto h-auto">
          <label>Text</label>
          <textarea
            value={currText}
            onChange={handleTextChange}
            className="nodrag [field-sizing:content] w-auto max-w-[300px] min-h-[2lh] resize-none block border-gray-100 border-2 min-h-2 p-1 rounded-lg text-sm"
          />
        </div>
        <div>
          {/* Suggestion list for detected variable triggers */}
          {inputNodes?.map((node) => (
            <Chip
              label={node?.data?.nodeName}
              color="primary"
              onClick={() => handleSelect(node)}
            />
          ))}
        </div>
      </div>
    </BaseNode>
  );
};
