export const INPUT = "Input";
export const OUTPUT = "Output";
export const TEXT = "Text";
export const CUSTOM_DECISION = "Decision node";
export const TRANSFORM = "Transform";
export const NODES_LIST = [
  {
    type: "customInput",
    label: INPUT,
  },
  {
    type: "text",
    label: TEXT,
  },
  {
    type: "customOutput",
    label: OUTPUT,
  },
  {
    type: "customDecision",
    label: CUSTOM_DECISION,
  },
  {
    type: "transformNode",
    label: TRANSFORM,
  },
];

export const NODE_TYPES = {
  customInput: INPUT,
  customOutput: OUTPUT,
  text: TEXT,
  customDecision: CUSTOM_DECISION,
  transformNode: TRANSFORM,
};

export const INPUT_TYPES = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "number",
    label: "Number",
  },
];

export const OUTPUT_TYPES = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "number",
    label: "Number",
  },
];

export const DECISIONS = [
  {
    value: "<",
    label: "lessThan",
  },
  {
    value: ">",
    label: "greaterThan",
  },
  {
    value: "==",
    label: "equalTo",
  },
];
