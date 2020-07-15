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
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: theme.gradientBackground,
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
  }
}));

const NavBar = (props) => {
  const classes = useStyles();

  const logOut = () => {
    props.sendLogoutReq();
  }

  const navigation = props.currentUserId ? (

    <Grid container spacing={3} style={{ 'justifyContent': 'space-between' }}>
      <Grid item xs={10}>
        <NavLink style={{ color: 'white' }} to="/">
          <Button color="inherit">Instantelegram</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to={`/profile/${props.currentUserId}`}>
          <Button color="inherit">Profile</Button>
        </NavLink>
        <NavLink style={{ color: 'white' }} to="/upload">
          <Button color="inherit">Upload</Button>
        </NavLink>
      </Grid>
      <Grid item>
        <div className={classes.logout} style={{ color: 'white' }}>
          <Button className={classes.logout} color="inherit" onClick={logOut}>Logout</Button>
        </div>
      </Grid>
    </Grid >
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
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        </IconButton>
        {navigation}
      </Toolbar>
    </AppBar>
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
