import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const shouldRedirect = true;
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Signup = lazy(() => import("./pages/Signup"));
  const Signin = lazy(() => import("./pages/Signin"));
  return (
    <div className="font-montserrat">
      <Suspense>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/user/dashboard" element={<Dashboard />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          {/* <Route
            path="/"
            element={shouldRedirect && <Navigate replace to="/home" />}
          ></Route> */}
          <Route
            path="*"
            element={shouldRedirect && <Navigate replace to="/not-found" />}
          ></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
