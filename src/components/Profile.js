import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Accordion, AccordionSummary } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionActions";
import { getUserProfileReq } from "../redux/user";
import { getUserIds } from "../redux/search";
import EditProfile from "./EditProfile";
import Image from "./Image";
import FollowBtn from "./FollowBtn";
import MessageBtn from "./MessageBtn";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";

import { pageVariants } from "../App";
import { setIsEditingProfile } from "../redux/user";
import "../css/profile.css";

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
    maxWidth: "90%",
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
  const { getUserProfileReq, getUserIds, setIsEditingProfile, token } = props;
  let id = window.location.href.split("/")[4];

  React.useEffect(() => {
    getUserProfileReq(id);
    getUserIds(token);

    return () => {
      setIsEditingProfile(false);
    };
  }, [getUserProfileReq, getUserIds, id, setIsEditingProfile, token]);

  const userId = props.currentUserId;
  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={pageVariants}
      key={`profile-${id}`}
      className="motion-div"
    >
      {props.profileId ? (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid id="profile-user-grid" container spacing={2}>
              <Grid item>
                <Avatar
                  alt="User avatar"
                  src={`${props.profileImage}`}
                  className={classes.large}
                />
              </Grid>
              <Grid id="profile-user-info" item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid id="profile-user-info-items" item xs>
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
                {/* displays follow and message buttons only if the current logged user doesn't matche the user */}
                {props.profileId !== userId ? (
                  <div>
                    <FollowBtn />
                    <MessageBtn />
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grid>
          </Paper>
          {/* displays the edit profile option only if the current logged user matches the user */}
          {props.profileId === userId ? (
            <Paper className={classes.paper}>
              <Accordion
                defaultExpanded={false}
                expanded={props.isEditingProfile}
              >
                <AccordionSummary
                  style={{ borderBottom: "solid 1px #F9F9F9" }}
                  onClick={() =>
                    props.setIsEditingProfile(!props.isEditingProfile)
                  }
                >
                  Edit Profile
                </AccordionSummary>
                <AccordionDetails>
                  <EditProfile profileBio={props.profileBio} />
                </AccordionDetails>
              </Accordion>
            </Paper>
          ) : (
            <div></div>
          )}
          <Paper className={classes.paper}>
            {/* displays all the user posts */}
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              alignContent="center"
              alignItems="flex-start"
            >
              {Object.keys(props.posts)
                .reverse()
                .map((key) => {
                  return (
                    <Grid item className={classes.column1} key={key}>
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
        <CircularProgress
          size="100px"
          style={{
            marginLeft: "calc(50% - 50px)",
            top: "40%",
            position: "absolute",
          }}
        />
      )}
    </motion.div>
  );
}

const mapStateToProps = (state) => {
  if (state && state.user && state.user.profile) {
    return {
      token: state.user.token,
      currentUserId: state.user.currentUserId,
      isEditingProfile: state.user.isEditingProfile,
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
    getUserIds: (...args) => dispatch(getUserIds(...args)),
    setIsEditingProfile: (boolean) => dispatch(setIsEditingProfile(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
