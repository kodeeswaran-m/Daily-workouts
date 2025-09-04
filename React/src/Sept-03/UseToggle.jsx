import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((previous) => !previous);

  return [value, toggle];
}

function DropDownComponent() {
  const [open, setOpen] = useToggle(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>{open ? "Hide" : "Open"}</Button>
      {open && (
        <List>
          <ListItem>
            <ListItemText primary="Ajay" secondary="Primary manager" />
            <ListItemText primary="Sam" secondary="Senior manager" />
          </ListItem>
        </List>
      )}
    </>
  );
}

function ModalComponent() {
  const [isOpen, setIsOpen] = useToggle(false);
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide" : "Open"}
      </Button>
      {isOpen && (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text Box
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              please close me :){" "}
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
}
function ToggleComponent() {
  return (
    <>
      <ModalComponent />
      <br></br>
      <DropDownComponent />
    </>
  );
}
export default ToggleComponent;
