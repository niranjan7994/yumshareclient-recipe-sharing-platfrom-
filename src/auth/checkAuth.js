import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const checkAuth = (Component) => {
  function Wrapper(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");  // Check if token exists
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    return localStorage.getItem("token") ? <Component {...props} /> : null;  // Render component only if user is logged in
  }

  return Wrapper;
};

export default checkAuth;
