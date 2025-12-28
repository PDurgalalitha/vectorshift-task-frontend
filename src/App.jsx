import { ToolBar } from "./components/toolbar";
import { PipeLineUI } from "./components/pipelineUI";
import { Button } from "./components/button";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import { POST, GET } from "./service";
import { useState, useEffect } from "react";
import CustomModal from "./components/CustomModal";
import Snackbar from "@mui/material/Snackbar";
import CommitIcon from "@mui/icons-material/Commit";
import HubIcon from "@mui/icons-material/Hub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CircularProgress from "@mui/material/CircularProgress";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

{
  /* 
    Main Entry Point of the Pipeline Application.
    Manages global layout, state synchronization between the React Flow canvas 
    and the backend API, and handles response visualization via a Modal.

  */
}

function App() {
  const { nodes, edges } = useStore(selector, shallow);

  // UI States for loading, error tracking, and API results
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validation: Ensure the canvas is not empty before submission
      if (nodes && nodes?.length === 0) {
        setError({ message: "Should have atleast one node", isShow: true });
        setLoading(false);
        return;
      }
      const payload = {
        nodes,
        edges,
      };
      // Submit pipeline to backend for parsing and DAG verification
      const resultData = await POST(`/pipelines/parse`, payload);
      console.log(resultData, "result");
      if (resultData) {
        setResult(resultData);
        setOpen(true); // Open only after data is successfully set
      }
      setOpen(true);
    } catch {
      // General error handling for network or server failures
      setError({ message: "something went wrong", isShow: true });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ToolBar />
      <PipeLineUI />
      <div className="flex gap-2 justify-center">
        <Button handleClick={handleClick} text={"Submit"} />
        {loading && <CircularProgress size={30} />}
      </div>

      {/* API Error Feedback */}
      <Snackbar
        open={error && error?.isShow}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error?.message}
      />

      {/* Results Summary Modal */}
      {open && (
        <CustomModal handleClose={handleClose} open={open}>
          <div className="flex flex-col bg-[#fff] p-4 rounded-lg gap-4">
            <p className="text-xl weight-300">Result</p>
            <div className="border-t-2 h-[0.5px]"></div>
            <div className="flex flex-col gap-2">
              <p>
                <HubIcon /> Nodes : {result?.num_nodes}
              </p>
              <p>
                <CommitIcon /> Edges : {result?.num_edges}
              </p>
              <p className={result?.is_dag ? "text-[green]" : "text-[red]"}>
                {result?.is_dag ? <CheckCircleIcon /> : <ReportProblemIcon />}
                {result?.is_dag
                  ? "The pipeline forms a Direct acyclic graph(DAG)"
                  : "The Pipeline does't form a Direct Acyclic Graph(DAG)"}
              </p>
            </div>
            <div className="border-t-2 h-[0.5px] border-dashed"></div>
            <div className="flex justify-end">
              <Button handleClick={handleClose} text={"Close"} />
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
}

export default App;
