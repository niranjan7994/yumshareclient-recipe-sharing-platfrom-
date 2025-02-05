import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const checkGuest = (Component) => {
  function Wrapper(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");  // Check if token exists
      if (token) {
        navigate("/home");  // Redirect to homepage if already logged in
      }
    }, [navigate]);

    return !localStorage.getItem("token") ? <Component {...props} /> : null;  // Render component only if user is not logged in
  }

  return Wrapper;
};

export default checkGuest;
