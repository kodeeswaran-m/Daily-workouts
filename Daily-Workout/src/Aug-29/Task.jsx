import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import SortIcon from "@mui/icons-material/Sort";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const DayOneTaskWithMUI = () => {
  const [list, setList] = useState(["apple", "alphine", "almond", "alrose"]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredList(list);
    } else {
      setFilteredList(
        list.filter((ele) => {
          return ele
            .toLowerCase()
            .trim()
            .includes(searchText.toLowerCase().trim());
        })
      );
    }
  }, [searchText, list]);
  function showNotification(msg) {
    setNotification(msg);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (currentInput.trim() !== "") {
      setList([...list, currentInput]);
      setCurrentInput("");
      showNotification("Item added successfully");
      setIsSorted(false);
    }
  }

  function handleDelete(index) {
    if (index === editIndex) {
      setEditIndex(null);
      setEditValue("");
    }
    let filteredItems = list.filter((ele, idx) => {
      return index !== idx;
    });
    showNotification("Item Deleted successfully");
    setList(filteredItems);
  }
  function handleSort() {
    console.log(isSorted);
    if (!isSorted) {
      setFilteredList([...filteredList].sort());
      setIsSorted(!isSorted);
    } else {
      const array = list.filter((ele) => {
        const isPresent = filteredList.indexOf(ele);
        return isPresent !== -1;
      });
      console.log("sample", array);
      setFilteredList([...array]);
      setIsSorted(!isSorted);
    }
  }

  // function handleSort() {}
  function handleEdit(index, item) {
    setEditIndex(index);
    setEditValue(item);
  }
  function handleSave(item) {
    let listItms = list.map((ele) => (ele === item ? editValue : ele));
    setList(listItms);
    showNotification("Item saved successfully");
    setEditIndex(null);
    setEditValue("");
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack direction="row" spacing={0}>
            <TextField
              size="small"
              label="Enter value"
              value={currentInput}
              onChange={(event) => setCurrentInput(event.target.value)}
              sx={{
                "& fieldset": {
                  borderRight: "none",
                  borderRadius: "4px 0 0 4px",
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ borderRadius: "0 4px 4px 0" }}
            >
              ADD
            </Button>
          </Stack>
          <p>{currentInput}</p>
        </form>
      </div>

      <h1>list of items</h1>
      <div>
        <Input
          type="text"
        //   variant="outlined"
          placeholder="search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton onClick={handleSort}>
          {!isSorted ? <SortIcon /> : <AdjustIcon />}
        </IconButton>
      </div>
      {filteredList.length === 0 ? (
        <p>no items found.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>S. No</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="right">
                    {editIndex === index ? (
                      <Input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      item
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <ButtonGroup>
                      <IconButton
                        onClick={() => handleDelete(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      {editIndex === index ? (
                        <IconButton onClick={() => handleSave(item)}>
                          <DoneIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleEdit(index, item)}
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {notification && <p>{notification}</p>}
    </>
  );
};

export default DayOneTaskWithMUI;
