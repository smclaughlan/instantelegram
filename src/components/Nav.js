import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { sendLogoutReq } from "../redux/user";
import Grid from "@material-ui/core/Grid";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

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

    width: 'min-content',
    // justifyItems: 'end',
    // alignItems: 'end'
  },
  search: {
    position: 'absolute',
    left: '32px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  const toggleNav = () => {
    const navMenu = document.querySelector(".mobile-nav-overlay");

    if (navMenu.style.visibility === "hidden") {
      navMenu.style.visibility = "visible";
      navMenu.style.height = "20%";
      closeSearch()
    } else {
      navMenu.style.visibility = "hidden";
      navMenu.style.height = 0;
    }
  };

  const openSearch = () => {
    const searchMenu = document.querySelector(".search-bar");
    searchMenu.style.visibility = "visible";
    searchMenu.style.height = "20%";
  };

  const closeSearch = () => {
    const searchMenu = document.querySelector(".search-bar");
    searchMenu.style.visibility = "hidden";
    searchMenu.style.height = 0;
  }

  const updateSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const logOut = () => {
    const navMenu = document.querySelector(".mobile-nav-overlay");
    if (navMenu.style.visibility === "visible") {
      toggleNav();
    }

    props.sendLogoutReq();
  };

  //when the user is logged in, navBar will display: profile, upload and logOut options
  //if not navBar will display logIn and register options only
  // const navigation = props.currentUserId ? (
  //   <Grid
  //     container
  //     spacing={4}
  //     style={{ "justify-content": "space-between" }}
  //     id="navbar-items"
  //   >
  //     <Grid className={classes.navContainer} item xs={10}>
  //       <NavLink style={{ color: "white" }} to="/">
  //         <Button color="inherit">Instantelegram</Button>
  //       </NavLink>
  //       <NavLink
  //         style={{ color: "white" }}
  //         to={`/profile/${props.currentUserId}`}
  //       >
  //         <Button color="inherit">Profile</Button>
  //       </NavLink>
  //       <NavLink style={{ color: "white" }} to="/upload">
  //         <Button color="inherit">Upload</Button>
  //       </NavLink>
  //       <div className={classes.search}>
  //         <div className={classes.searchIcon}>
  //           <SearchIcon />
  //         </div>
  //         <InputBase
  //           placeholder="Search…"
  //           className={classes.inputContainer}
  //           classes={{
  //             root: classes.inputRoot,
  //             input: classes.inputInput,
  //           }}
  //           inputProps={{ 'aria-label': 'search' }}
  //         />
  //       </div>
  //     </Grid>
  //     <Grid item>
  //       <div className={classes.logout} style={{ color: "white" }}>
  //         <Button className={classes.logout} color="inherit" onClick={logOut}>
  //           Logout
  //         </Button>
  //       </div>
  //     </Grid>
  //   </Grid>
  // ) : (
  //   <div id="navbar-items">
  //     <NavLink style={{ color: "white" }} to="/register">
  //       <Button color="inherit">Register</Button>
  //     </NavLink>
  //     <NavLink style={{ color: "white" }} to="/login">
  //       <Button color="inherit">Login</Button>
  //     </NavLink>
  //   </div>
  // );

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

  const searchBar = props.userIds ? (
    <div
      className="search-bar"
      style={{ height: "20%", visibility: "hidden" }}
    >
      {Object.keys(props.userIds).map((key) => {
        if (props.userIds[key].username.toLowerCase().includes(searchTerm) && searchTerm !== "") {
          console.log(props.userIds[key].username)
          return (
            <NavLink key={key} style={{ color: "white" }} to={`/profile/${key}`} onClick={closeSearch}>
              <Button color="inherit">{props.userIds[key].username}</Button>
            </NavLink>
          )
        } else if ( searchTerm === "" ) {
          return (
            <NavLink key={key} style={{ color: "white" }} to={`/profile/${key}`} onClick={closeSearch}>
              <Button color="inherit">{props.userIds[key].username}</Button>
            </NavLink>
          )
        } else {
          return ""
        }
      })}
    </div>
  ) : (
    ""
  );

  const searchInput = props.currentUserId ? (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={(event)=>{ updateSearch(event) }}
        inputProps={{ 'aria-label': 'search', 'onFocus': openSearch, 'onBlur': closeSearch }}
      />
    </div>
  ) : (
    ""
  )

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
            onClick={toggleNav}
          >
            <MenuIcon />
          </IconButton>

          {searchInput}

          <NavLink
            style={{ color: "white" }}
            to="/"
            className="mobile-home-btn"
          >
            <Button color="inherit">Instantelegram</Button>
          </NavLink>
          {/* {navigation} */}
        </Toolbar>
      </AppBar>
      {mobileNavigation}
      {searchBar}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
    userIds: state.search.userIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendLogoutReq: () => dispatch(sendLogoutReq()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
