{
  /* 
    Component to create draggable elements for the React Flow sidebar.
    Handles data transfer for drag-and-drop node creation.

    Props:
    - type: (String) The React Flow node type (e.g., 'customInput', 'text').
    - label: (String) The display text shown on the sidebar item.
  */
}
export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="cursor-grab min-w-[80px] h-[60px] flex items-center justify-center flex-col p-[10px] rounded-[8px] bg-[#3963b4] shadow-[5px_5px_10px_#aaaaaa]"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <span className="text-[#fff]">{label}</span>
    </div>
  );
};
