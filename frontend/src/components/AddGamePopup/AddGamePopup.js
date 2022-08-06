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
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const AddGameContainer = styled.div`
  padding: 20px 10px 0px;
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

const AddGamePopup = ({ open }) => {
  const BASE_URL = "http://localhost:8000/api";
  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [data, setData] = useState({
    name: "",
    publisher: "",
    price: "",
    genre_id: "",
    platform_id: "",
    image: "",
    description: "",
    release_date: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/genre`)
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.log(`Error: ${err.response.data.message}`));

    axios
      .get(`${BASE_URL}/platform`)
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

  const handleSubmit = () => {
    if (!img) {
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("publisher", data.publisher);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("image", img);
    formData.append("release_date", data.release_date);
    formData.append("genre_id", data.genre_id);
    formData.append("platform_id", data.platform_id);

    axios
      .post(`${BASE_URL}/game`, formData)
      .then((res) => {
        console.log(res.data.data);
        open(false);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  };
  return (
    <>
      <AddGameContainer>
        <FormContainer>
          <FormWrapper>
            <ImgContainer>
              <Img src={image} />
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
                  onChange={handleChange}
                />
                <TextField
                  id="standard-basic"
                  label="Publisher Name"
                  name="publisher"
                  variant="outlined"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="date"
                  label="Date of release"
                  type="date"
                  size="small"
                  name="release_date"
                  fullWidth
                  color="primary"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    onChange={handleChange}
                    name="price"
                    size="small"
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Price"
                  />
                </FormControl>
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
                placeholder="Description"
                style={{
                  width: "100%",
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
      </AddGameContainer>
    </>
  );
};

export default AddGamePopup;
