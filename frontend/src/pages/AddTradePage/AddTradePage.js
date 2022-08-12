import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./AddTradePage.css";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BASE_URL } from "../../utils/url";
import { toastError, toastSuccess } from "../../utils/Toast";
import { userHeaders, userID } from "../../utils/Token";
import axios from "axios";

const Input = styled.input`
  display: none;
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;
const AddTradePage = () => {
  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [data, setData] = useState({
    name: "",
    genre: "",
    platform: "",
    publisher: "",
    description: "",
    status: "",
    location: "",
    user_id: "",
    trade_to: "",
  });

  useEffect(() => {
    // get all genres
    axios
      .get(`${BASE_URL}/genre`, userHeaders)
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));

    // get all platforms
    axios
      .get(`${BASE_URL}/platform`, userHeaders)
      .then((res) => setPlatforms(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleImage = async (e) => {
    let img = e.target.files[0];
    if (img) {
      setImg(img);
      setImage(URL.createObjectURL(img));
    }
  };

  const cancel = () => {
    window.location.href = "/home";
  };

  const submit = () => {
    if (!img) {
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("publisher", data.publisher);
    formData.append("description", data.description);
    formData.append("image", img);
    formData.append("location", data.location);
    formData.append("genre", data.genre);
    formData.append("platform", data.platform);
    formData.append("trade_to", data.trade_to);
    formData.append("status", "review");
    formData.append("user_id", userID);
    console.log(formData);
    axios
      .post(`${BASE_URL}/traddedgame`, formData, userHeaders)
      .then((res) => {
        console.log(res.data.data);
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
        toastSuccess(res.data.message);
      })
      .catch((err) => toastError(err.response.data.message));
  };
  return (
    <>
      <Navbar />
      <div className="form_title">
        <h1>New Trading Post</h1>
        <p>PLease fill all fiels with your game information.</p>
      </div>
      <form>
        <div className="form_container_one">
          <div className="game-name-input">
            <TextField
              variant="standard"
              required
              name="name"
              id="outlined-required"
              label="Required"
              helperText="Please enter the name of game"
              size="small"
              onChange={handleChange}
            />
          </div>
          <div className="game-selects">
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="helper-label-genre-label">Genre</InputLabel>
              <Select
                labelId="helper-label-genre-label"
                id="helper-label-genre"
                label="Genre"
                variant="standard"
                name="genre"
                onChange={handleChange}
                sx={{ marginRight: 5, width: 150 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genres.map((genre, index) => {
                  return (
                    <MenuItem key={index} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="helper-label-platform-label">Platform</InputLabel>
              <Select
                labelId="helper-label-platform-label"
                id="helper-label-platform"
                label="Platform"
                variant="standard"
                name="platform"
                onChange={handleChange}
                sx={{ marginRight: 5, width: 150 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {platforms.map((platform, index) => {
                  return (
                    <MenuItem key={index} value={platform.name}>
                      {platform.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="game-info-inputs">
            <TextField
              required
              id="outlined-required"
              label="Required"
              name="publisher"
              helperText="Enter the publisher of game"
              variant="standard"
              size="small"
              onChange={handleChange}
              sx={{ width: 200, marginRight: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              name="trade_to"
              helperText="I want to trade to"
              variant="standard"
              onChange={handleChange}
              size="small"
              sx={{ minwWidth: 140, marginRight: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              name="location"
              helperText="Your Location"
              variant="standard"
              size="small"
              onChange={handleChange}
              sx={{ width: 150, marginRight: 2 }}
            />
          </div>
          <div className="text-area">
            <TextareaAutosize
              maxRows={4}
              name="description"
              onChange={handleChange}
              aria-label="maximum height"
              placeholder="Add your description"
              style={{ width: "100%", height: 200, padding: 10 }}
            />
          </div>
        </div>
        <div className="form_container_two">
          <ImgContainer>
            <AddImg src={image} />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                name="image"
                onChange={handleImage}
              />

              <Button
                variant="outlined"
                component="span"
                startIcon={<DriveFolderUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </ImgContainer>
          <div className="form-btns">
            <Button
              variant="contained"
              color="success"
              sx={{ margin: 1 }}
              onClick={submit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: 1 }}
              onClick={cancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default AddTradePage;
