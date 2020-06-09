import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import { sendLogoutReq } from '../redux/user';


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

const NavBar = () => {
  const classes = useStyles();

  const logOut = () => {
    // props.sendLogoutReq();
    window.localStorage.removeItem("x-access-token")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          {/* <Typography variant="h6" className={classes.title}>
            Instantelegram
          </Typography> */}
          <NavLink style={{ color: 'white' }} to="/">
            <Button color="inherit">Instantelegram</Button>
          </NavLink>
          <NavLink style={{ color: 'white' }} to="/register">
            <Button color="inherit">Register</Button>
          </NavLink>
          <NavLink style={{ color: 'white' }} to="/login">
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink style={{ color: 'white' }} to="/logout">
            <Button color="inherit" onClick={logOut}>Logout</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
