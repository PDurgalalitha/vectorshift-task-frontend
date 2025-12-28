import Modal from "@mui/material/Modal";

{
  /* 
    Reusable wrapper for the system Modal (Dialogue).
    Centered in the viewport using Flexbox.

    Props:
    - open: (Boolean) Controls the visibility of the modal.
    - handleClose: (Function) Callback triggered when clicking the backdrop or 'Close' actions.
    - children: (ReactNode) The custom content/UI to be displayed inside the modal container.
  */
}
const CustomModal = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
