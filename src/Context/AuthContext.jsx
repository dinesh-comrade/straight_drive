import {
  createContext,
  useContext,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { useNavigate } from "react-router-dom";
import calendar from "../assets/calendar.svg";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Login States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);

  const history = useNavigate();

  const handleGetOtp = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://api.straightdrive.xyz/sd/orbit/login/otp",
        {
          email,
        }
      );
      setOtpSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://api.straightdrive.xyz/sd/orbit/login/validateotp",
        {
          email,
          otp,
        }
      );
      setEmail("");
      setOtp("");
      setEmailError("");
      setOtpError("");
      setOtpSent(false);
      setIsLoggedIn(true);
      history("/straight_drive/data-logs");
    } catch (error) {
      console.log(error);
    }
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

  const handleLogOut = () => {
    setIsLoggedIn(false);
    history("/straight_drive/login");
  };

  // Data Logs States

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <div className="input-group">
        <span
          className="input-group-text"
          id="basic-addon1"
          onClick={onClick}
          ref={ref}
        >
          <img src={calendar} alt="calendar" className="calendar-icon" />
        </span>
        <input
          value={value}
          onChange={() => {}}
          className="form-control"
          aria-label="Calendar"
          aria-describedby="basic-addon1"
        />
      </div>
    </>
  ));

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((res) => {
        setRowData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        otp,
        setOtp,
        emailError,
        setEmailError,
        otpError,
        setOtpError,
        otpSent,
        setOtpSent,
        handleOTPSubmit,
        handleGetOtp,
        handleEmailChange,
        handleOtpChange,
        isEmailValid,
        isOtpValid,
        isloggedIn,
        handleLogOut,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        CustomInput,
        rowData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
