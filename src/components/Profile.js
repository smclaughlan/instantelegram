import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import { getUserProfileReq } from '../redux/user';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function Profile(props) {
  const classes = useStyles();
  // const [data, setData] = React.useState(null); //if we can't pull data from redux store



  React.useEffect(() => {
    let id = window.location.href.split("/")[4];
    console.log(id);
    props.getUserProfileReq(id);

  }, []);

  // React.useEffect(() => {
  //   (async () => {


  //     //call redux function later
  //     // http: / / localhost:3000 / profile / 1
  //     let id = window.location.href.split("/")[4];
  //     console.log(id);
  //     await props.getUserProfileReq(id);

  //   })()
  // }, []);


  return (props.profileId ?
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {/* <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase> */}
            <Avatar alt="User avatar" src={`${props.profileImage}`} className={classes.large} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.profileUsername}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.profileBio}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    :
    <div>Loading</div>
  );
}


const mapStateToProps = state => {
  console.log(state)
  if (state && state.user && state.user.profile) {
    return {
      token: state.user.token,
      profileId: state.user.profile.id,
      profileUsername: state.user.profile.username,
      profileBio: state.user.profile.bio,
      profileImage: state.user.profile.avatarUrl,
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfileReq: (...args) => dispatch(getUserProfileReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Profile
);