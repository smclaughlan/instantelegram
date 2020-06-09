import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { sendLogoutReq } from '../redux/user';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  const logOut = () => {
    props.sendLogoutReq();
  }

  const navigation = props.currentUserId ? (
      <>
        <NavLink style={{ color: 'white' }} to="/">
          <Button color="inherit">Instantelegram</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/profile">
          <Button color="inherit">Profile</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/upload">
          <Button color="inherit">Upload</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/login">
          <Button color="inherit" onClick={logOut}>Logout</Button>
        </NavLink>
      </>
    ) : (
      <>
        <NavLink style={{ color: 'white' }} to="/register">
          <Button color="inherit">Register</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/login">
          <Button color="inherit">Login</Button>
        </NavLink>
      </>
    )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          {navigation}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendLogoutReq: () => dispatch(sendLogoutReq()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  NavBar
);
