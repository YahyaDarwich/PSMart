import styled from "styled-components";
import { FormControl, Grid, InputLabel, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { BASE_URL } from "../../utils/url";
import { adminHeaders } from "../../utils/Token";

const ViewDetailsContainer = styled.div`
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

const ViewDetails = ({ open, id }) => {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: "",
    publisher: "",
    price: "",
    description: "",
    trade_to: "",
    // image: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/traddedgame/${id}`, adminHeaders)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(`Error: ${err.response.data.message}`));
  }, []);

  return (
    <>
      <ViewDetailsContainer>
        <FormContainer>
          <FormWrapper>
            <ImgContainer>
              <Img
              // src={"http://localhost:8000/image/" + data.image}
              />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="image"
                  required
                />
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
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-basic"
                  label="Game Name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  value={data.name}
                />
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-basic"
                  label="Publisher Name"
                  name="publisher"
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  value={data.publisher}
                />
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="standard-basic"
                  label="Trade To"
                  name="trade_to"
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  value={data.trade_to}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    name="price"
                    type="number"
                    size="small"
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Price"
                    value={data.price}
                  />
                </FormControl>
              </Grid>

              <TextareaAutosize
                value={data.description}
                aria-label="minimum height"
                minRows={4}
                md={6}
                name="description"
                placeholder="Description"
                style={{
                  width: "100%",
                  height: 150,
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
            startIcon={<CloseIcon />}
            onClick={() => open(false)}
          >
            Close
          </Button>
        </DialogActions>
      </ViewDetailsContainer>
    </>
  );
};

export default ViewDetails;
