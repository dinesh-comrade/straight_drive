import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  const Loading = () => <div>Loading...</div>;
  const Home = lazy(() => import("./Components/Home"));
  const Login = lazy(() => import("./Components/Login"));
  const Data = lazy(() => import("./Components/Data"));

  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
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
