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
  let tokenFromLocalStorage = localStorage.getItem("token");
  let userIdFromLocalStorage = localStorage.getItem("userId");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    if (tokenFromLocalStorage && userIdFromLocalStorage) {
      console.log("I am entered in useEffect");
      const handleTokenAndUserIdChange = async () => {
        console.log("Token before response2: ", tokenFromLocalStorage);
        if (tokenFromLocalStorage === null) {
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
            `https://api.straightdrive.xyz/sd/orbit/client/clientList/${userIdFromLocalStorage}`,
            {
              headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`,
              },
            }
          );
          console.log("Response2: ", response2.data.responseBody);
          setClientData(response2.data.responseBody);
        }
      };
      handleTokenAndUserIdChange();
    }
  }, [tokenFromLocalStorage, userIdFromLocalStorage]);

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
      const token = response.data.responseBody.token;
      const userId = response.data.responseBody.userId;
      setFirstName(response.data.responseBody.firstName);
      setLastName(response.data.responseBody.lastName);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setIsLoggedIn(true);
      history("/game-log");
      console.log("FIRSTNAME, LASTNAME: ", response.data.responseBody);
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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
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

  // Data Grid Fetching from API
  const [clientID, setClientID] = useState(
    clientData && clientData[0] ? clientData[0].clientId : null
  );
  const [machineID, setMachineID] = useState(
    machineData && machineData[0] ? machineData[0].machineId : null
  );
  const [rowData, setRowData] = useState([]);

  const handleClientID = (e) => {
    setClientID(e.target.value);
  };

  const handleMachineID = (e) => {
    setMachineID(e.target.value);
  };

  useEffect(() => {
    if (clientData.length > 0) {
      const handleClient = async () => {
        try {
          const response3 = await axios.get(
            `https://api.straightdrive.xyz/sd/orbit/machine/machinesList/${clientID}`,
            {
              headers: {
                Authorization: `Bearer ${tokenFromLocalStorage}`,
              },
            }
          );

          setMachineData(response3.data.responseBody);
        } catch (error) {
          console.log(error);
        }
      };
      if (clientID !== null) {
        handleClient();
      }
    }
  }, [clientData, tokenFromLocalStorage, clientID]);

  const handleDataGrid = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenFromLocalStorage}`,
    };

    const data = {
      clientId: clientID,
      machineId: machineID,
      fromDate: fromDate,
      toDate: toDate,
    };

    try {
      const dataGridResponse = await axios.post(
        "https://api.straightdrive.xyz/sd/orbit/gamedata/cricket/byclient",
        data,
        {
          headers: headers,
        }
      );

      console.log("Data Grid Response: ", dataGridResponse.data);
      setRowData(dataGridResponse.data.responseBody);
      console.log("Row Data inside Func: ", rowData);

      if (dataGridResponse) {
        toast.success("Data Fetched Successfully", {
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

  useEffect(() => {
    console.log("Row data:", rowData);
  }, [rowData]);

  // Context Provider
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
        handleClientID,
        handleMachineID,
        clientID,
        machineID,
        handleDataGrid,
        firstName,
        lastName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
