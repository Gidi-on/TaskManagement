import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const shouldRedirect = true;
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Signup = lazy(() => import("./pages/Signup"));
  const Signin = lazy(() => import("./pages/Signin"));
  const Create = lazy(() => import("./pages/CreateTask"));
  const Edit = lazy(() => import("./pages/EditTask"));
  return (
    <div className="font-montserrat">
      <Suspense>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/user/dashboard" element={<Dashboard />}></Route>
          <Route path="/user/new" element={<Create />}></Route>
          <Route
            path="/user/update/:_id/:title/:precedence/:dueDate/:description"
            element={<Edit />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
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
