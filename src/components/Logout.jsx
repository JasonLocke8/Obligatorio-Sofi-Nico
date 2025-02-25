/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("apiKey");
    localStorage.removeItem("id");

    navigate("/login");
  };

  return (
    <Button
      className="logout-button"
      variant="contained"
      color="primary"
      onClick={handleLogout}
      sx={{
        border: "2px solid #1976d2",
        backgroundColor: "#ffffff",
        color: "#000000",
        borderRadius: "25px",
        textTransform: "none",
        "&:hover": {
          borderColor: "#1976d2",
          backgroundColor: "#a8d7ff",
        },
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
