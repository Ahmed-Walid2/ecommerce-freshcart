import { Navigate } from "react-router-dom";

export default function LoginProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to={"/home"} />;
  } else {
    return children;
  }
}
