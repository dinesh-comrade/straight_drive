import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./Components/Navigation";

function App() {
  const Loading = () => <div>Loading...</div>;

  const Home = lazy(() => import("./Components/Home"));
  const Login = lazy(() => import("./Components/Login"));
  const Data = lazy(() => import("./Components/Data"));

  return (
    <Router>
      <Navigation />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/straight_drive" element={<Home />} />
        </Routes>
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/straight_drive/login" element={<Login />} />
        </Routes>
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/straight_drive/data-logs" element={<Data />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
