import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import { AuthProvider } from "./Context/AuthContext";
import { Loading } from "./Components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Home = lazy(() => import("./Components/Home"));
  const Login = lazy(() => import("./Components/Login"));
  const Data = lazy(() => import("./Components/Data"));

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <ToastContainer />
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game-log" element={<Data />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
