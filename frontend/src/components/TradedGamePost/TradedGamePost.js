import React, { useState } from "react";
import "./TradedGamePost.css";
import { toastError, toastSuccess } from "../../utils/Toast";
import { userHeaders } from "../../utils/Token";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import EditTradedGameUser from "../../components/EditTradedGameUser/EditTradedGameUser";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TradedGamePost = (props) => {
  const [editOpen, setEditOpen] = useState(false);
  // for edit form
  const [gameName, setGameName] = useState(undefined);
  const [gameID, setGameID] = useState(undefined);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/traddedgame/${props.id}`, userHeaders)
      .then((res) => {
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
        toastSuccess(res.data.message);
      })
      .catch((err) => toastError(err.response.data.message));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setGameID(props.id);
    setGameName(props.name);
    setEditOpen(true);
  };
  return (
    <>
      <div className="post">
        <div className="post_main">
          <div className="post_img">
            <img src={"http://localhost:8000/image/" + props.image} alt="" />
          </div>
          <div className="post_info">
            <h3 className="title">{props.name}</h3>
            <p className="description">{props.description}</p>
          </div>
        </div>
        <div className="post_second">
          {props.status === "approved" ? (
            <span style={{ color: "green", border: "1px solid green" }}>
              Approved
            </span>
          ) : props.status === "rejected" ? (
            <span style={{ color: "#f21b3f", border: "1px solid #f21b3f" }}>
              Rejected
            </span>
          ) : (
            <span style={{ color: "#0066ff", border: "1px solid #0066ff" }}>
              In Review
            </span>
          )}
          <div className="post_actions">
            <button
              className="edit"
              onClick={(e) => {
                handleEdit(e);
              }}
            >
              Edit
            </button>
            <button
              className="delete"
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
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
          <DialogContentText style={{ marginBottom: 15 }}>
            Here you can edit your game.
          </DialogContentText>
          <EditTradedGameUser open={(e) => setEditOpen(e)} gameID={gameID} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TradedGamePost;
