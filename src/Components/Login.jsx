import React from "react";
import "../CSS/Login.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, otp);
    setEmail("");
    setOtp("");
    setEmailError("");
    setOtpError("");
    setOtpSent(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("first submit", email);
    setOtpSent(true);
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    };

    setEmail(email);
    if (email === "") {
      setEmailError("Please fill in the email");
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleOtpChange = (event) => {
    const otp = event.target.value;
    setOtp(otp);

    const validateOtp = (otp) => {
      const otpRegex = /^[0-9]{6}$/;
      return otpRegex.test(otp);
    };

    if (otp === "") {
      setOtpError("Please fill in the OTP");
    } else if (!validateOtp(otp)) {
      setOtpError("Invalid OTP format");
    } else {
      setOtpError("");
    }
  };

  const isEmailValid = () => {
    return email !== "" && emailError === "";
  };

  const isOtpValid = () => {
    return otp !== "" && otpError === "";
  };

  return (
    <form className="login-form">
      <div className="container">
        <div className="login-container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center login-title">Login</h1>
            </div>
          </div>
          <div className="login-body">
            <div className="mb-3 row">
              <label
                htmlFor="staticEmail"
                className="col-sm-2 col-form-label login-label"
              >
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="login-input"
                  value={email}
                  id="exampleFormControlInput1 validationCustom01"
                  placeholder="Enter the Email ID"
                  onChange={handleEmailChange}
                  disabled={otpSent}
                  required
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
            </div>
            {otpSent && (
              <>
                <div className="mb-3 row">
                  <label
                    htmlFor="otp"
                    className="col-sm-2 col-form-label login-label"
                  >
                    OTP
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="tel"
                      className="form-control"
                      value={otp}
                      id="exampleFormControlInput1 validationCustom02"
                      placeholder="Enter the OTP"
                      onChange={handleOtpChange}
                      required
                    />
                    {otpError && <p className="error-message">{otpError}</p>}
                  </div>
                </div>
                <div className="mb-3 row justify-content-end">
                  <div className="col-lg-4 col-md-2 col-sm-2 col-12 d-flex justify-content-end">
                    <button
                      className="btn btn-resend py-0 ps-0 pe-2"
                      type="button"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
                <div className="mb-3 row justify-content-end">
                  <div className="col-lg-4 col-md-2 col-sm-2 col-12 d-flex justify-content-end">
                    <button
                      className="btn btn-primary px-4 py-1 rounded-pill btn-login"
                      type="submit"
                      disabled={!isOtpValid()}
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </>
            )}
            {!otpSent && (
              <>
                <div className="mb-3 row justify-content-end">
                  <div className="col-lg-4 col-md-2 col-sm-2 col-12 d-flex justify-content-end">
                    <button
                      className="btn btn-primary px-4 py-1 rounded-pill btn-login"
                      type="submit"
                      disabled={!isEmailValid()}
                      onClick={handleEmailSubmit}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
