import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {children}
        <button style={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    modalRoot
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "300px",
    textAlign: "center"
  },
  closeBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    cursor: "pointer"
  }
};

export default Modal;
