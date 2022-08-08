import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "../../utils/url";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewDetails from "../../components/ViewDetails/ViewDetails";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DashTradedGames = () => {
  const [reviews, setReviews] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [run, setRun] = useState(false);
  const [open, setOpen] = useState(false);
  const [gameID, setGameID] = useState(undefined);

  useEffect(() => {
    // get all reviews
    axios
      .get(`${BASE_URL}/traddedgame/status/review`)
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));

    // get all approved
    axios
      .get(`${BASE_URL}/traddedgame/status/approved`)
      .then((res) => {
        setApproved(res.data.data);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));

    // get all rejected
    axios
      .get(`${BASE_URL}/traddedgame/status/rejected`)
      .then((res) => {
        setRejected(res.data.data);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, [run]);

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/traddedgame/${id}`)
      .then((res) => {
        setRun(!run);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  };

  const action = (id, action) => {
    let data = {};
    axios
      .get(`${BASE_URL}/traddedgame/${id}`)
      .then((res) => {
        data = {
          name: res.data.data.name,
          price: res.data.data.price,
          description: res.data.data.description,
          trade_to: res.data.data.trade_to,
          publisher: res.data.data.publisher,
          user_id: res.data.data.user_id,
          status: action,
        };

        axios
          .post(`${BASE_URL}/traddedgame/${id}`, data)
          .then((res) => {
            setRun(!run);
          })
          .catch((err) => console.log(`Error: ${err.response.data.message}`));
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Game name", width: 200 },
    { field: "publisher", headerName: "Publisher name", width: 200 },
    { field: "price", headerName: "Price $", width: 100 },
    { field: "trade_to", headerName: "Trade To", width: 150 },
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
              color="secondary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                setGameID(params.row.id);
                setOpen(true);
              }}
            >
              View Details
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<CloseIcon />}
              style={{ marginRight: "10px" }}
              onClick={() => {
                action(params.row.id, "rejected");
              }}
            >
              Reject
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="success"
              startIcon={<DoneIcon />}
              style={{ marginRight: "10px" }}
              onClick={() => {
                action(params.row.id, "approved");
              }}
            >
              Approve
            </Button>
          </>
        );
      },
    },
  ];

  // columns
  const secondColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Game name", width: 200 },
    { field: "publisher", headerName: "Publisher name", width: 200 },
    { field: "price", headerName: "Price $", width: 100 },
    { field: "trade_to", headerName: "Trade To", width: 150 },
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
              color="secondary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                setGameID(params.row.id);
                setOpen(true);
              }}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              style={{ marginRight: "10px" }}
              onClick={() => {
                handleDelete(params.row.id);
              }}
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
        title="Tradded Games"
        subTitle="Here's you can manage all traded games of users"
      />
      <div style={{ height: 362, width: "100%", marginBottom: 70 }}>
        <h2 style={{ marginLeft: 10, fontSize: 20, color: "#9c27b0" }}>
          In Review
        </h2>
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={5}
          rowHeight={50}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <div style={{ height: 362, width: "100%", marginBottom: 70 }}>
        <h2 style={{ marginLeft: 10, fontSize: 20, color: "#2e7d32" }}>
          Approved
        </h2>
        <DataGrid
          rows={approved}
          columns={secondColumns}
          pageSize={5}
          rowHeight={50}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <div style={{ height: 362, width: "100%", marginBottom: 70 }}>
        <h2 style={{ marginLeft: 10, fontSize: 20, color: "#d32f2f" }}>
          Rejected
        </h2>
        <DataGrid
          rows={rejected}
          columns={secondColumns}
          pageSize={5}
          rowHeight={50}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      <Dialog open={open}>
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
          <DialogContentText style={{marginBottom: 30}}>
            Here you can see all the info of the tradded game.
          </DialogContentText>
          <ViewDetails open={(e) => setOpen(e)} id={gameID} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashTradedGames;
