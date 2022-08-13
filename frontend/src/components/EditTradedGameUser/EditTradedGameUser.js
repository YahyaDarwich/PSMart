import styled from "styled-components";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { BASE_URL } from "../../utils/url";
import { toastError, toastSuccess } from "../../utils/Toast";
import { userHeaders, userID } from "../../utils/Token";

const EditGameContainer = styled.div`
  padding: 10px 10px 0px;
  @media only screen and (max-width: 768px) {
    padding-top: 10px;
  }
`;
const FormContainer = styled.form``;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 50px;
  @media only screen and (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const Input = styled.input`
  display: none;
`;

const EditGamePopup = ({ open, gameID }) => {
  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/traddedgame/${gameID}`, userHeaders)
      .then((res) => {
        setGames(res.data.data);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));

    axios
      .get(`${BASE_URL}/genre`, userHeaders)
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));

    axios
      .get(`${BASE_URL}/platform`, userHeaders)
      .then((res) => setPlatforms(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);

  const handleChange = (e) => {
    setGames({ ...games, [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    let img = e.target.files[0];
    if (img) {
      setImg(img);
      setImage(URL.createObjectURL(img));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", games.name);
    formData.append("publisher", games.publisher);
    formData.append("location", games.location);
    formData.append("description", games.description);
    formData.append("trade_to", games.trade_to);
    formData.append("status", "review");
    formData.append("user_id", userID);
    if (games.genre) formData.append("genre", games.genre);
    if (games.platform) formData.append("platform", games.platform);
    if (img) formData.append("image", img);
    axios
      .post(`${BASE_URL}/traddedgame/${gameID}`, formData, userHeaders)
      .then((res) => {
        console.log(res.data.data);
        open(false);
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
        toastSuccess(res.data.message);
      })
      .catch((err) => toastError(err.response.data.message));
  };

  return (
    <>
      <EditGameContainer>
        <FormContainer>
          <FormWrapper>
            <ImgContainer>
              <Img
                src={image || "http://localhost:8000/image/" + games.image}
              />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="image"
                  required
                  onChange={handleImage}
                />

                <Button
                  variant="contained"
                  type="button"
                  component="span"
                  startIcon={<DriveFolderUploadIcon />}
                >
                  Upload
                </Button>
              </label>
            </ImgContainer>
            <Grid
              container
              spacing={{ xs: 0, md: 2 }}
              px={5}
              sx={{
                "& .MuiFormControl-root": {
                  marginTop: "8px",
                  marginBottom: "8px",
                },
              }}
            >
              <Grid>
                <TextField
                  id="standard-basic"
                  label="Game Name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  autoFocus
                  value={games.name || ""}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-basic"
                  label="Publisher Name"
                  name="publisher"
                  variant="outlined"
                  required
                  value={games.publisher || ""}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="standard-basic"
                  label="Trade To"
                  name="trade_to"
                  variant="outlined"
                  required
                  value={games.trade_to || ""}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="standard-basic"
                  label="Location"
                  name="location"
                  variant="outlined"
                  required
                  value={games.location || ""}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid style={{ width: "100%" }}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Genre</InputLabel>
                  <Select
                    label="Genre"
                    name="genre_id"
                    required
                    onChange={handleChange}
                  >
                    <MenuItem value={undefined} hidden>
                      <em>None</em>
                    </MenuItem>
                    {genres.map((genre, index) => {
                      return (
                        <MenuItem key={index} value={genre.id}>
                          {genre.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Platform</InputLabel>
                  <Select
                    label="Platform"
                    name="platform_id"
                    required
                    onChange={handleChange}
                  >
                    <MenuItem value={undefined} hidden>
                      <em>None</em>
                    </MenuItem>
                    {platforms.map((platform, index) => {
                      return (
                        <MenuItem key={index} value={platform.id}>
                          {platform.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                md={6}
                name="description"
                onChange={handleChange}
                value={games.description || ""}
                placeholder="Description"
                style={{
                  width: "100%",
                  height: 75,
                  marginTop: "10px",
                  fontSize: "14px",
                  padding: "5px",
                }}
              />
            </Grid>
          </FormWrapper>
        </FormContainer>
        <DialogActions style={{ marginTop: "15px" }}>
          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => open(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </EditGameContainer>
    </>
  );
};

export default EditGamePopup;
