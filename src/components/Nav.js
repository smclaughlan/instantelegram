import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { sendLogoutReq } from "../redux/user";
// import Grid from "@material-ui/core/Grid";

import "../css/nav.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: theme.gradientBackground,
    width: "100%",
    height: "64px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    width: "min-content",
    // justifyItems: 'end',
    // alignItems: 'end'
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    position: "absolute",
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   marginRight: theme.spacing(3),
    // width: 'auto',
    // },
  },
  searchIcon: {
    position: "absolute",
    pointerEvents: "none",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    // width: '100%',
    [theme.breakpoints.up("md")]: {
      // width: '20ch',
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldShowNav, setShouldShowNav] = useState(false);
  const [shouldShowSearch, setShouldShowSearch] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      // console.log(e.target);
      const targetClassName = e.target.className;
      if (
        !targetClassName ||
        typeof targetClassName !== "string" ||
        !targetClassName.includes("instantelegram-search")
      ) {
        setShouldShowSearch(false);
      }
      if (
        !targetClassName ||
        typeof targetClassName !== "string" ||
        !targetClassName.includes("mobile-nav")
      ) {
        setShouldShowNav(false);
      }
    };
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [setShouldShowSearch]);

  // const toggleNav = () => {
  //   const navMenu = document.querySelector(".mobile-nav-overlay");

  //   if (navMenu.style.visibility === "hidden") {
  //     navMenu.style.visibility = "visible";
  //     navMenu.style.height = "180px";
  //     closeSearch();
  //   } else {
  //     navMenu.style.visibility = "hidden";
  //     navMenu.style.height = 0;
  //   }
  // };

  // const openSearch = () => {
  //   const searchMenu = document.querySelector(".search-bar");
  //   searchMenu.style.visibility = "visible";
  //   searchMenu.style.height = "max-content";
  // };

  // const closeSearch = () => {
  //   const searchMenu = document.querySelector(".search-bar");
  //   if (searchMenu) {
  //     searchMenu.style.visibility = "hidden";
  //     searchMenu.style.height = 0;
  //   }
  // };

  const updateSearch = (e) => {
    setSearchTerm(e.target.value);
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
      style={
        shouldShowNav
          ? { height: "180px", visibility: "visible" }
          : { height: 0, visibility: "hidden" }
      }
    >
      <NavLink style={{ color: "white" }} to={`/`}>
        <Button color="inherit">Home</Button>
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
      <div
        className={classes.logout}
        style={{ color: "white" }}
        onClick={() => props.sendLogoutReq()}
      >
        <Button className={classes.logout} color="inherit">
          Logout
        </Button>
      </div>
    </div>
  ) : (
    <div
      className="mobile-nav-overlay"
      style={
        shouldShowNav
          ? { height: "120px", visibility: "visible" }
          : { height: 0, visibility: "hidden" }
      }
    >
      <NavLink style={{ color: "white" }} to={`/`}>
        <Button color="inherit">Home</Button>
      </NavLink>
      <NavLink style={{ color: "white" }} to="/register">
        <Button color="inherit">Register</Button>
      </NavLink>
      <NavLink style={{ color: "white" }} to="/login">
        <Button color="inherit">Login</Button>
      </NavLink>
    </div>
  );

  const searchBar = props.userIds ? (
    <div
      className="search-bar instantelegram-search"
      style={
        shouldShowSearch
          ? { maxHeight: "100vh", visibility: "visible" }
          : { maxHeight: 0, visibility: "hidden" }
      }
    >
      {Object.keys(props.userIds).map((key) => {
        if (
          props.userIds[key].username.toLowerCase().includes(searchTerm) &&
          searchTerm !== ""
        ) {
          // console.log(props.userIds[key].username)
          return (
            <NavLink
              key={key}
              style={{ color: "white" }}
              to={`/profile/${key}`}
            >
              <Button color="inherit">{props.userIds[key].username}</Button>
            </NavLink>
          );
        } else if (searchTerm === "") {
          return (
            <NavLink
              key={key}
              style={{ color: "white" }}
              to={`/profile/${key}`}
            >
              <Button color="inherit">{props.userIds[key].username}</Button>
            </NavLink>
          );
        } else {
          return "";
        }
      })}
    </div>
  ) : (
    ""
  );

  const searchInput = props.currentUserId ? (
    <div
      className={`${classes.search} instantelegram-search`}
      style={{ margin: "0 auto 0 auto" }}
    >
      <div className={`${classes.searchIcon} instantelegram-search`}>
        <span
          className="iconify"
          data-icon="fluent:search-28-regular"
          data-inline="false"
          style={{ height: "1.5rem", width: "1.5rem", margin: "0.4rem" }}
        />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: `${classes.inputInput} instantelegram-search`,
        }}
        onChange={(event) => {
          updateSearch(event);
        }}
        inputProps={{
          "aria-label": "search",
          onFocus: () => setShouldShowSearch(true),
        }}
      />
    </div>
  ) : (
    ""
  );

  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.root} style={{ justifyContent: "center" }}>
          <IconButton
            edge="start"
            className={`${classes.menuButton} mobile-nav`}
            classes={{ label: "mobile-nav" }}
            color="inherit"
            aria-label="menu"
            id="mobile-menu-icon"
            onClick={() =>
              shouldShowNav ? setShouldShowNav(false) : setShouldShowNav(true)
            }
          >
            <span className="mobile-nav">
              <span
                className="iconify mobile-nav"
                data-icon="radix-icons:hamburger-menu"
                data-inline="false"
                style={{ pointerEvents: "none" }}
              />
            </span>
          </IconButton>

          {searchInput}
          {props.currentUserId && props.currentUser ? (
            <>
              <div
                onClick={() => props.history.push("/upload")}
                style={{
                  cursor: "pointer",
                  height: "2.5rem",
                  margin: "auto 0",
                  marginLeft: "auto",
                }}
              >
                <span
                  className="iconify new-post"
                  data-icon="akar-icons:circle-plus"
                  data-inline="false"
                  style={{
                    color: "white",
                    height: "2.5rem",
                    marginRight: "1rem",
                    width: "2.5rem",
                  }}
                />
              </div>

              <NavLink
                to={`/profile/${props.currentUserId}`}
                style={{ height: "2.5rem", margin: "auto 0" }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    height: "2.5rem",
                    marginLeft: "auto",
                    width: "2.5rem",
                  }}
                  src={props.currentUser ? props.currentUser.avatarUrl : null}
                  alt="Profile"
                />
              </NavLink>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      {mobileNavigation}
      {searchBar}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.profile,
    currentUserId: state.user.currentUserId,
    userIds: state.search.userIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendLogoutReq: () => dispatch(sendLogoutReq()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
