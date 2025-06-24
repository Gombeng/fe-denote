import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Components";

const MainApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <Outlet />
    </div>
  );
};

export default MainApp;
