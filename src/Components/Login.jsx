import React from "react";
import "../CSS/Login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const {
    email,
    otp,
    emailError,
    otpError,
    otpSent,
    handleGetOtp,
    handleOTPSubmit,
    handleEmailChange,
    handleOtpChange,
    isEmailValid,
    isOtpValid,
  } = useAuth();

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
                      className="login-input"
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
                    <Link to="/game-log">
                      <button
                        className="btn btn-primary px-4 py-1 rounded-pill btn-login"
                        type="button"
                        disabled={!isOtpValid()}
                        onClick={handleOTPSubmit}
                      >
                        Login
                      </button>
                    </Link>
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
                      onClick={handleGetOtp}
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
