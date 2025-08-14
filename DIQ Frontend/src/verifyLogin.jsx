import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function VerifyLogin({ children }) {
  const [loginStatus, setLoginStatus] = useState("checking"); 

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:8000/verify_login", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
        });

        const data = await response.json();
        console.log("Verify login response:", data);

        if (Boolean(data.status) === true) {
          setLoginStatus("loggedIn");
        } else {
          setLoginStatus("loggedOut");
        }
      } catch (error) {
        console.error("Error verifying login:", error);
        setLoginStatus("loggedOut");
      }
    };

    checkLogin();
  }, []);

  
  if (loginStatus === "checking") {
    return <p>Loading...</p>;
  }

  
  if (loginStatus === "loggedIn") {
    return children;
  }

  
  return <Navigate to="/login" replace />;
}
