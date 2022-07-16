import React from "react";
import "./AccessPage.css"

const AccessPage = () => {
  const overlayBtn = () => {
    const container = document.getElementById("container");
    container.classList.toggle('right-panel-active');
  }
  return (
    <>
      <div className="access_body">
        <div class="container" id="container">
          <div class="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <div class="infield">
                <input type="text" placeholder="Name" />
                <label></label>
              </div>
              <div class="infield">
                <input type="email" placeholder="Email" name="email" />
                <label></label>
              </div>
              <div class="infield">
                <input type="password" placeholder="Password" />
                <label></label>
              </div>
              <div class="infield">
                <input type="password" placeholder="Confirm Password" />
                <label></label>
              </div>
              <button>Sign Up</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div class="infield">
                <input type="email" placeholder="Email" name="email" />
                <label></label>
              </div>
              <div class="infield">
                <input type="password" placeholder="Password" />
                <label></label>
              </div>
              <button>Sign In</button>
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
                <h1>Hello, Friend!<br/>🖐</h1>
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
}

export default AccessPage;
