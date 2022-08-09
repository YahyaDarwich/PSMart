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
import AddAdminPopup from "../../components/AddAdminPopup/AddAdminPopup";
import EditAdminPopup from "../../components/EditAdminPopup/EditAdminPopup";
import { BASE_URL } from "../../utils/url";
import { toastError, toastSuccess } from "../../utils/Toast";

const DashboardAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  // for edit form
  const [adminName, setAdminName] = useState(undefined);
  const [adminID, setAdminID] = useState(undefined);

  useEffect(() => {
    // get all admins
    axios
      .get(`${BASE_URL}/admins`)
      .then((res) => setAdmins(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);

  // Delete Admin
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/user/${id}`)
      .then((res) => {
        setAdmins(res.data.data);
        toastSuccess(res.data.message);
      })
      .catch((err) => toastError(err.response.data.message));
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Admin name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 100 },
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
                setAdminID(params.row.id);
                setAdminName(params.row.name);
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
        subTitle="Here's you can manage all website admins"
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
          Add Admin
        </Button>
        <div style={{ height: 400, width: "100%", margin: "auto" }}>
          <DataGrid
            rows={admins}
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
          Add Admin
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: 20 }}>
            Here you can add a admin to the dashboard. Please make sure to
            include all the data because all the fields are required.
          </DialogContentText>
          <AddAdminPopup open={(e) => setAddOpen(e)} />
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
          Edit {adminName} admin
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: 20 }}>
            Here you can edit the admins.
          </DialogContentText>
          <EditAdminPopup open={(e) => setEditOpen(e)} adminID={adminID} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardAdmin;
