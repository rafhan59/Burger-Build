import React, { useState } from "react";
import { Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";
import "../Header/Header.css";
import Logo from "../../Assets/logo.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const Header = (props) => {
  
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
 
  let links = null;

  if (props.token === null) {
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <NavLink exact to="/login" className="NavLink">
            Log In
          </NavLink>
        </NavItem>
      </Nav>
    );
  } else {
    links = (
      <div>
      <Navbar color="faded" dark expand="md" navbar>
      <NavbarToggler onClick={toggleNavbar} className="mr-0" style={{outline: "0"}}/>
      <Collapse isOpen={!collapsed} navbar>
      <Nav className="mr-md-5" navbar>
        <NavItem>
          <NavLink exact to="/" className="NavLink">
            Burgerbuilder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/orders" className="NavLink">
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/logout" className="NavLink">
            Log Out
          </NavLink>
        </NavItem>
      </Nav>
      </Collapse>
      </Navbar>
      </div>
    );
  }
  return (
    <div className="Navigation">
      <Navbar
        style={{
          backgroundColor: "#D70F64",
          maxHeight: "300px",
        }} navbar
      >
        <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
          <img src={Logo} alt="logo" width="80px" navbar />
        </NavbarBrand>
        {links}
      </Navbar>
    </div>
  );
};
export default connect(mapStateToProps)(Header);



