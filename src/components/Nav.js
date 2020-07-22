import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { sendLogoutReq } from "../redux/user";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";

import "../css/nav.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: theme.gradientBackground,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    width: "min-content",
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  const toggleNav = () => {
    const navMenu = document.querySelector(".mobile-nav-overlay");

    if (navMenu.style.visibility === "hidden") {
      navMenu.style.visibility = "visible";
      navMenu.style.height = "20%";
    } else {
      navMenu.style.visibility = "hidden";
      navMenu.style.height = 0;
    }
  };

  const logOut = () => {
    const navMenu = document.querySelector(".mobile-nav-overlay");
    if (navMenu.style.visibility === "visible") {
      toggleNav();
    }

    props.sendLogoutReq();
  };

  //when the user is logged in, navBar will display: profile, upload and logOut options
  //if not navBar will display logIn and register options only
  const navigation = props.currentUserId ? (
    <Grid
      container
      spacing={3}
      style={{ "justify-content": "space-between" }}
      id="navbar-items"
    >
      <Grid item xs={10}>
        <NavLink style={{ color: "white" }} to="/">
          <Button color="inherit">Instantelegram</Button>
        </NavLink>
        <NavLink
          style={{ color: "white" }}
          to={`/profile/${props.currentUserId}`}
        >
          <Button color="inherit">Profile</Button>
        </NavLink>
        <NavLink style={{ color: "white" }} to="/upload">
          <Button color="inherit">Upload</Button>
        </NavLink>
      </Grid>

      <Grid item>
        <div className={classes.logout} style={{ color: "white" }}>
          <Button className={classes.logout} color="inherit" onClick={logOut}>
            Logout
          </Button>
        </div>
      </Grid>
    </Grid>
  ) : (
    <div id="navbar-items">
      <NavLink style={{ color: "white" }} to="/register">
        <Button color="inherit">Register</Button>
      </NavLink>
      <NavLink style={{ color: "white" }} to="/login">
        <Button color="inherit">Login</Button>
      </NavLink>
    </div>
  );

  const mobileNavigation = props.currentUserId ? (
    <div
      className="mobile-nav-overlay"
      style={{ height: "20%", visibility: "hidden" }}
    >
      <NavLink
        style={{ color: "white" }}
        to={`/profile/${props.currentUserId}`}
        onClick={toggleNav}
      >
        <Button color="inherit">Profile</Button>
      </NavLink>
      <NavLink style={{ color: "white" }} to="/upload" onClick={toggleNav}>
        <Button color="inherit">Upload</Button>
      </NavLink>
      <div className={classes.logout} style={{ color: "white" }}>
        <Button className={classes.logout} color="inherit" onClick={logOut}>
          Logout
        </Button>
      </div>
    </div>
  ) : (
    <div
      className="mobile-nav-overlay"
      style={{ height: "20%", visibility: "hidden" }}
    >
      <NavLink style={{ color: "white" }} to="/register" onClick={toggleNav}>
        <Button color="inherit">Register</Button>
      </NavLink>
      <NavLink style={{ color: "white" }} to="/login" onClick={toggleNav}>
        <Button color="inherit">Login</Button>
      </NavLink>
    </div>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar style={{ justifyContent: "center" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            id="mobile-menu-icon"
          >
            <MenuIcon onClick={toggleNav} />
          </IconButton>
          <NavLink
            style={{ color: "white" }}
            to="/"
            className="mobile-home-btn"
          >
            <Button color="inherit">Instantelegram</Button>
          </NavLink>
          {navigation}
        </Toolbar>
      </AppBar>
      {mobileNavigation}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendLogoutReq: () => dispatch(sendLogoutReq()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
