import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";

const DashboardGenre = () => {
  // const [genres, setGenres] = useState([]);
  const genres = [{ id: 1, genre: "Snow"}];

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "genre", headerName: "Genre game", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 250,
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
              // onClick={() => {
              //   handleClickEdit(params.row.id, params.row.name);
              // }}
            >
              Update
            </Button>

            <Button
              variant="contained"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              style={{ marginRight: "10px" }}
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={genres}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default DashboardGenre;
