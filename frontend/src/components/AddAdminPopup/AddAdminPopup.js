import styled from "styled-components";
import { Grid, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { toastError, toastSuccess } from "../../utils/Toast";
import { adminHeaders } from "../../utils/Token";

const AddGameContainer = styled.div`
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

const AddGamePopup = ({ open }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    isAdmin: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("isAdmin", "true");

    axios
      .post(`${BASE_URL}/register`, formData, adminHeaders)
      .then((res) => {
        console.log(res.data.data);
        open(false);
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
        toastSuccess(res.data.message);
      })
      .catch((err) => toastError(err.response.data.message));
  };
  return (
    <>
      <AddGameContainer>
        <FormContainer>
          <FormWrapper>
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
                  label="Admin Name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  onChange={handleChange}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  size="small"
                  name="password"
                  fullWidth
                  color="primary"
                  onChange={handleChange}
                />
                <TextField
                  id="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  size="small"
                  name="password_confirmation"
                  fullWidth
                  color="primary"
                  onChange={handleChange}
                />
                <TextField
                  id="phone"
                  label="Phone Number"
                  type="number"
                  size="small"
                  name="phone"
                  fullWidth
                  color="primary"
                  onChange={handleChange}
                />
              </Grid>
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
