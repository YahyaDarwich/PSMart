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

const DashboardGenre = () => {
  const [platforms, setPlatforms] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  // for edit form
  const [platformName, setPlatformName] = useState(undefined);
  const [platformID, setPlatformID] = useState(undefined);
  // for edit & add form
  const [newPlatformName, setNewPlatformName] = useState(undefined);
  const [run, setRun] = useState(false);

  useEffect(() => {
    // get all platforms
    axios
      .get(`${BASE_URL}/platform`)
      .then((res) => setPlatforms(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, [run]);

  // Delete platform
  const handeDelete = (id) => {
    axios
      .delete(`${BASE_URL}/platform/${id}`)
      .then((res) => {
        setPlatforms(res.data.data);
        toastSuccess(res.data.message);
      })
      .catch((err) => toastError(err.response.data.message));
  };

  // Edit platform
  const handleEdit = () => {
    const genreBody = { name: platformName };
    axios
      .put(`${BASE_URL}/platform/${platformID}}`, genreBody)
      .then((res) => {
        setEdit(false);
        setRun(!run);
        toastSuccess(res.data.message);
      })
      .catch((err) => toastError(err.response.data.message));
  };

  const handleClickEdit = (platformID, name) => {
    setPlatformName(name);
    setPlatformID(platformID);
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  const handleChangeInput = (e) => {
    setPlatformName(e.target.value);
  };

  // Add platform
  const handleAdd = () => {
    const genreBody = { name: newPlatformName };
    axios
      .post(`${BASE_URL}/platform`, genreBody)
      .then((res) => {
        setOpen(false);
        setRun(!run);
        toastSuccess(res.data.message);
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
    setNewPlatformName(e.target.value);
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Platform name", width: 200 },
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
              onClick={() => handeDelete(params.row.id)}
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
        title="Platforms"
        subTitle="Here's you can manage all website platforms"
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
          Add Platform
        </Button>
        <div style={{ height: 400, width: 560, margin: "auto" }}>
          <DataGrid
            rows={platforms}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Platform</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of platform
          </DialogContentText>
          <FormControl>
            <TextField
              id="outlined-required"
              color="success"
              required
              size="small"
              margin="normal"
              type="text"
              label="Name of platform"
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
        <DialogTitle>Update Platform</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new name of platform
          </DialogContentText>
          <FormControl>
            <TextField
              id="outlined-required"
              color="success"
              size="small"
              margin="normal"
              type="text"
              label="Name of platform"
              variant="outlined"
              name="className"
              autoFocus
              onChange={handleChangeInput}
              defaultValue={platformName}
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
