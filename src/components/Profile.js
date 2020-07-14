import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { getUserProfileReq } from "../redux/user";
import EditProfile from "./EditProfile";
import Image from "./Image";
import FollowBtn from "./FollowBtn";
import MessageBtn from "./MessageBtn";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  paper: {
    padding: theme.spacing(2),

    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 800,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  gridList: {
    justifyContent: "space-around",
    maxWidth: 500,
    height: 450,
  },
}));

function Profile(props) {
  const classes = useStyles();

  React.useEffect(() => {
    console.log("You triggered the Use Effect Hook");
    let id = window.location.href.split("/")[4];
    console.log(id);
    props.getUserProfileReq(id);
  }, []);

  const userId = props.currentUserId;
  return props.profileId ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              alt="User avatar"
              src={`${props.profileImage}`}
              className={classes.large}
            />
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
          <Grid>
            {props.profileId !== userId ? (
              <div>
                <FollowBtn></FollowBtn>
                <MessageBtn></MessageBtn>
              </div>
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      </Paper>
      {props.profileId === userId ? (
        <Paper className={classes.paper}>
          <ExpansionPanel>
            <ExpansionPanelSummary>Edit Profile</ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <EditProfile profileBio={props.profileBio}></EditProfile>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      ) : (
        <div></div>
      )}
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignContent="center"
          alignItems="flex-start"
        >
          {Object.keys(props.posts).map((key) => {
            return (
              <Grid item className={classes.column1}>
                <Image
                  imageId={key}
                  postDate={props.posts[key].timestamp}
                  imageUrl={props.posts[key].imageUrl}
                  imageCapt={props.posts[key].caption}
                  imagePosterUsername={props.profileUsername}
                  imagePosterAviUrl={props.profileImage}
                  imagePosterId={props.posts[key].user_id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  ) : (
    <CircularProgress />
  );
}

const mapStateToProps = (state) => {
  if (state && state.user && state.user.profile) {
    return {
      token: state.user.token,
      currentUserId: state.user.currentUserId,
      profileId: state.user.profile.id,
      profileUsername: state.user.profile.username,
      profileBio: state.user.profile.bio,
      profileImage: state.user.profile.avatarUrl,
      posts: state.user.posts,
      likes: state.user.likes,
    };
  } else {
    return {
      token: state.user.token,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfileReq: (...args) => dispatch(getUserProfileReq(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
