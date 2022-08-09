import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import AddGamePopup from "../../components/AddGamePopup/AddGamePopup";
import EditGamePopup from "../../components/EditGamePopup/EditGamePopup";
import { BASE_URL } from "../../utils/url";
import { toastError, toastSuccess } from "../../utils/Toast";

const DashboardGame = () => {
  const [games, setGames] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  // for edit form
  const [gameName, setGameName] = useState(undefined);
  const [gameID, setGameID] = useState(undefined);

  useEffect(() => {
    // get all games
    axios
      .get(`${BASE_URL}/game`)
      .then((res) => setGames(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);

  // Delete genre
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/game/${id}`)
      .then((res) => {
        setGames(res.data.data);
        toastSuccess(res.data.message)
      })
      .catch((err) => toastError(err.response.data.message));
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Genre name", width: 200 },
    { field: "publisher", headerName: "Publisher name", width: 200 },
    { field: "price", headerName: "Price $", width: 100 },
    { field: "release_date", headerName: "Release Date", width: 150 },
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
                setGameID(params.row.id);
                setGameName(params.row.name);
                setEditOpen(true);
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
        title="Games"
        subTitle="Here's you can manage all website games"
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
          onClick={() => setAddOpen(true)}
          sx={{ margin: "auto" }}
        >
          Add Game
        </Button>
        <div style={{ height: 400, width: "100%", margin: "auto" }}>
          <DataGrid
            rows={games}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>

      {/* Add Popup */}
      <Dialog open={addOpen}>
        <DialogTitle
          sx={{
            background: "linear-gradient(-315deg, #f0f0f0 0%, #14213d 74%)",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginBottom: "5px",
          }}
        >
          Add Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can add a game to the bowse page. Please make sure to
            include all the data because all the fields are required.
          </DialogContentText>
          <AddGamePopup open={(e) => setAddOpen(e)} />
        </DialogContent>
      </Dialog>

      {/* Edit Popup */}
      <Dialog open={editOpen}>
        <DialogTitle
          sx={{
            background: "linear-gradient(-315deg, #f0f0f0 0%, #14213d 74%)",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginBottom: "5px",
          }}
        >
          Edit {gameName} Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Here you can edit the games.</DialogContentText>
          <EditGamePopup open={(e) => setEditOpen(e)} gameID={gameID} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardGame;
