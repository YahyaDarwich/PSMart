import React from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./AddTradePage.css";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

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
  return (
    <>
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
              id="outlined-required"
              label="Required"
              helperText="Please enter the name of game"
              size="small"
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
                sx={{ marginRight: 5, width: 150 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="helper-label-platform-label">Platform</InputLabel>
              <Select
                labelId="helper-label-platform-label"
                id="helper-label-platform"
                label="Platform"
                variant="standard"
                sx={{ marginRight: 5, width: 150 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="game-info-inputs">
            <TextField
              required
              id="outlined-required"
              label="Required"
              helperText="Enter the publisher of game"
              variant="standard"
              size="small"
              sx={{ width: 200, marginRight: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              helperText="I want to trade to"
              variant="standard"
              size="small"
              sx={{ minwWidth: 140, marginRight: 2 }}
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
              helperText="Your Location"
              variant="standard"
              size="small"
              sx={{ width: 150, marginRight: 2 }}
            />
          </div>
          <div className="text-area">
            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="Add your description"
              style={{ width: "100%", height: 200, padding: 10 }}
            />
          </div>
        </div>
        <div className="form_container_two">
          <ImgContainer>
            <AddImg />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                name="image"
                //onChange={handleImage}
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
            >
              Submit
            </Button>
            <Button variant="contained" color="error" sx={{ margin: 1 }}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTradePage;
