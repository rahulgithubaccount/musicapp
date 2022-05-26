

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";


 function Navbar() {
 
  
  return (
    <AppBar >
      <Toolbar>
        <Tabs textColor=".text-white" sx={{ marginLeft: "auto" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            
            <Tab label={("Home")} textColor=".text-white"></Tab>
          </Link>
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "white" }}
          >
            
            <Tab label={("SignUp")} textColor=".text-white"></Tab>
          </Link>
          

          <Link
            to="/login"
            style={{ textDecoration: "none", color: "white" }}
          >
            
            <Tab label={("Login")} textColor=".text-white"></Tab>
          </Link>

        </Tabs>
       
      
      </Toolbar>
    </AppBar>
  );
}


export default Navbar