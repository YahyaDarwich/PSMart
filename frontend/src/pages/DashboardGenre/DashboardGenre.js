import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { BASE_URL } from "../../utils/url";
import { toastError, toastSuccess } from "../../utils/Toast";
import { adminHeaders } from "../../utils/Token";

const DashboardGenre = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  // for edit form
  const [genreName, setGenreName] = useState(undefined);
  const [genreID, setGenreID] = useState(undefined);
  // for edit & add form
  const [newGenreName, setNewGenreName] = useState(undefined);
  const [run, setRun] = useState(false);

  useEffect(() => {
    // get all genres
    axios
      .get(`${BASE_URL}/genre`, adminHeaders)
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, [run]);

  // Delete genre
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/genre/${id}`, adminHeaders)
      .then((res) => {
        setGenres(res.data.data);
        toastSuccess(res.data.message)
      })
      .catch((err) => toastError(err.response.data.message));
  };

  // Edit genre
  const handleEdit = () => {
    const genreBody = { name: genreName };
    axios
      .put(`${BASE_URL}/genre/${genreID}}`, genreBody, adminHeaders)
      .then((res) => {
        setEdit(false);
        setRun(!run);
        toastSuccess(res.data.message)
      })
      .catch((err) => toastError(err.response.data.message));
  };

  const handleClickEdit = (genreID, name) => {
    setGenreName(name);
    setGenreID(genreID);
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  const handleChangeInput = (e) => {
    setGenreName(e.target.value);
  };

  // Add genre
  const handleAdd = () => {
    const genreBody = { name: newGenreName };
    axios
      .post(`${BASE_URL}/genre`, genreBody, adminHeaders)
      .then((res) => {
        setOpen(false);
        setRun(!run);
        toastSuccess(res.data.message)
      })
      .catch((err) => toastError(err.response.data.message));
  };

  const handleClickAdd = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeAddClass = (e) => {
    setNewGenreName(e.target.value);
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Genre name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              size="small"
              color="success"
              startIcon={<ModeEditOutlineIcon />}
              style={{ marginRight: "10px" }}
              onClick={() => {
                handleClickEdit(params.row.id, params.row.name);
              }}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              style={{ marginRight: "10px" }}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <DashboardHeader
        title="Genres"
        subTitle="Here's you can manage all website genres"
      />
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "88%",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickAdd}
          sx={{ margin: "auto" }}
        >
          Add Genre
        </Button>
        <div style={{ height: 400, width: 560, margin: "auto" }}>
          <DataGrid
            rows={genres}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Genre</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the name of genre</DialogContentText>
          <FormControl>
            <TextField
              id="outlined-required"
              color="success"
              required
              size="small"
              margin="normal"
              type="text"
              label="Name of genre"
              variant="outlined"
              autoFocus
              name="newClass"
              onChange={handleChangeAddClass}
              defaultValue={undefined}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleAdd}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={edit} onClose={handleCloseEdit}>
        <DialogTitle>Update Genre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new name of genre
          </DialogContentText>
          <FormControl>
            <TextField
              id="outlined-required"
              color="success"
              size="small"
              margin="normal"
              type="text"
              label="Name of genre"
              variant="outlined"
              name="className"
              autoFocus
              onChange={handleChangeInput}
              defaultValue={genreName}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleCloseEdit}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleEdit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardGenre;
