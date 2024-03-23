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
import { toast, Bounce } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Login States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [clientData, setClientData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const history = useNavigate();

  // Get OTP
  const handleGetOtp = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://api.straightdrive.xyz/sd/orbit/login/otp",
        {
          email,
        }
      );
      if (response) {
        toast.success("OTP Sent Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setOtpSent(true);
      }
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // Token Generation and Storing in Local Storage
  useEffect(() => {
    if (token && userId) {
      const handleTokenAndUserIdChange = async () => {
        console.log("Token before response2: ", token);
        localStorage.setItem("token", token);
        const getToken = localStorage.getItem("token");
        console.log(getToken);
        if (getToken === null) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          history("/game-log");
          toast.success("OTP Verified Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          const response2 = await axios.get(
            `https://api.straightdrive.xyz/sd/orbit/client/clientList/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("response2:", response2.data.responseBody[0]);
          setClientData(response2.data.responseBody);
        }
      };
      handleTokenAndUserIdChange();
    }
  }, [token, userId]);

  //Get Client Data
  useEffect(() => {
    if (clientData.length > 0) {
      const handleClient = async () => {
        const response3 = await axios.get(
          `https://api.straightdrive.xyz/sd/orbit/machine/machinesList/${clientData[0].id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response3.data.responseBody);
        setMachineData(response3.data.responseBody);
      };
      handleClient();
    }
  }, [clientData, token]);

  // OTP Verification

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
      console.log(response.data.responseBody);
      const tokenFromResponse = response.data.responseBody.token;
      const userIdFromResponse = response.data.responseBody.userId;
      setToken(tokenFromResponse);
      setUserId(userIdFromResponse);
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // Email and OTP Validation
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
    history("/login");
  };

  // Date Picker States

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

  // Ag-Grid Data Fetching

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
        clientData,
        machineData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
