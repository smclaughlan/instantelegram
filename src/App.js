import React from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AnimatePresence } from "framer-motion";
import SimpleReactLightbox from "simple-react-lightbox";

import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/Upload";
import NavBar from "./components/Nav";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Theme from "./Theme";
import Splash from "./components/Splash";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import RestoreIcon from "@material-ui/icons/Restore";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import LocationOnIcon from "@material-ui/icons/LocationOn";

import { ProtectedRoute, AuthRoute } from "./authRoutes";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    marginTop: 100,
    justifySelf: "right",
  },
  bottom: {
    width: "100%",
    right: 0,
    bottom: 0,
    left: 0,
    position: "relative",
    marginTop: "auto",
  },
  img: {
    marginLeft: 100,
    marginRight: 100,
    marginTop: 100,
    display: "block",
    width: 700,
    height: 500,
  },
  image: {
    justifyContent: "space-around",
    margin: "0 auto",
    maxWidth: 1000,
  },
});

export const pageVariants = {
  enter: { opacity: 0, y: "-100vh" },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-100vh" },
};

function App(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <CssBaseline />
      <Theme>
        <NavBar location={props.location} />
        {/* <NavBar location={props.location} /> */}
        <div className="body-wrapper">
          <SimpleReactLightbox>
            <AnimatePresence exitBeforeEnter={true}>
              <Switch>
                <AuthRoute
                  exact
                  path="/"
                  component={Splash}
                  currentUserId={props.currentUserId}
                />
                <ProtectedRoute
                  path="/profile/:userid"
                  component={Profile}
                  currentUserId={props.currentUserId}
                />
                <AuthRoute
                  path="/login"
                  component={Login}
                  currentUserId={props.currentUserId}
                />
                <AuthRoute
                  path="/register"
                  component={Register}
                  currentUserId={props.currentUserId}
                />
                <ProtectedRoute
                  path="/upload"
                  component={Upload}
                  currentUserId={props.currentUserId}
                />
                <ProtectedRoute
                  path="/home"
                  component={Feed}
                  currentUserId={props.currentUserId}
                />
              </Switch>
            </AnimatePresence>
          </SimpleReactLightbox>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.bottom}
          >
            <BottomNavigationAction
              label="About"
              href="https://github.com/smclaughlan/instantelegram"
              target="_blank"
            />

            <BottomNavigationAction
              label="Sean McLaughlan"
              href="https://github.com/smclaughlan"
              target="_blank"
            ></BottomNavigationAction>
            <BottomNavigationAction
              label="Riki Kaneshiro"
              href="https://github.com/arkaneshiro"
              target="_blank"
            ></BottomNavigationAction>
            <BottomNavigationAction
              label="Monia Techini"
              href="https://github.com/moniatec"
              target="_blank"
            ></BottomNavigationAction>
            <BottomNavigationAction
              label="Seamus Le"
              href="https://github.com/lullofthesea"
              target="_blank"
            ></BottomNavigationAction>
          </BottomNavigation>
        </div>
      </Theme>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
