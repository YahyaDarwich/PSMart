import React, { useState } from "react";
import "./AccessPage.css";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import Cookies from "universal-cookie";
import { toastError, toastSuccess } from "../../utils/Toast";

const AccessPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    isAdmin: "false",
  });
  const overlayBtn = () => {
    const container = document.getElementById("container");
    container.classList.toggle("right-panel-active");
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  // Login
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/login`, data)
      .then((response) => {
        const headers = {
          headers: { Authorization: `Bearer ${response.data.token}` },
        };
        axios
          .get(`${BASE_URL}/logeduser/`, headers)
          .then((res) => {
            const cookies = new Cookies();
            if (res.data.user.isAdmin === "true") {
              cookies.set("TOKEN_ADMIN", response.data.token, {
                path: "/dash/",
              });
              setTimeout(() => {
                window.location.href = "dash/tradedgames";
              }, 2000);
              toastSuccess("Welcome Back!");
            } else {
              cookies.set("TOKEN_USER", response.data.token, { path: "/" });
              cookies.set("USER_ID", res.data.user.id, {
                path: "/",
              });
              setTimeout(() => {
                window.location.href = "/home";
              }, 2000);
              toastSuccess("Login Successfully");
            }
            cookies.set("ACCESS_NAME", res.data.user.name, {
              path: "/",
            });
          })
          .catch((err) => console.log(`Error: ${err.response.data.error}`));
      })
      .catch((err) => toastError(err.response.data.error));
  };

  // Register
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/register`, register)
      .then((res) => {
        toastSuccess("Successfully Register! try to login now");
      })
      .catch((err) => toastError(err.response.data.message));
  };
  return (
    <>
      <div className="access_body">
        <div class="container" id="container">
          <div class="form-container sign-up-container">
            <form
              onSubmit={(e) => {
                handleSubmitRegister(e);
              }}
            >
              <h1>Create Account</h1>
              <div class="infield">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChangeRegister}
                />
                <label></label>
              </div>
              <div class="infield">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChangeRegister}
                />
                <label></label>
              </div>
              <div class="infield">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChangeRegister}
                />
                <label></label>
              </div>
              <div class="infield">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  onChange={handleChangeRegister}
                />
                <label></label>
              </div>
              <div class="infield">
                <input
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChangeRegister}
                />
                <label></label>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h1>Sign in</h1>
              <div class="infield">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
                <label></label>
              </div>
              <div class="infield">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                <label></label>
              </div>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div class="overlay-container" id="overlayCon">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!👋</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button>Sign In</button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>
                  Hello, Friend!
                  <br />
                  🖐
                </h1>
                <p>Enter your personal details and start journey with us</p>
                <button>Sign Up</button>
              </div>
            </div>
            <button id="overlayBtn" onClick={overlayBtn}></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessPage;
