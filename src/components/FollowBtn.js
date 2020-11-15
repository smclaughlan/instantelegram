import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { sendFollowReq, sendUnfollowReq } from "../redux/user";
import { getFollowings } from "../redux/user";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const FollowBtn = (props) => {
  const classes = useStyles();
  let followedId = window.location.href.split("/")[4];


  useEffect(() => {
    let userId = parseInt(window.localStorage.getItem("currentUserId"));
    props.getFollowings(userId);
  }, []);

  const handleFollow = async () => {
    let userId = window.localStorage.getItem("currentUserId");
    props.sendFollowReq(userId, followedId);
  };

  const handleUnfollow = async () => {
    let userId = window.localStorage.getItem("currentUserId");
    props.sendUnfollowReq(userId, followedId);
  };

  //if the user is a following for the current user, displays Unfollow button
  //if not display Follow button
  return props.followings && !props.updateFollowing ? (
    props.followings.includes(parseInt(window.location.href.split("/")[4])) && !props.updateFollowing ? (
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={handleUnfollow}>
          UnFollow
        </Button>
      </div>
    ) : (
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={handleFollow}>
          Follow
        </Button>
      </div>
    )
  ) : (
    <div className={classes.root}>
    <Button variant="contained" color="primary">
      ...
    </Button>
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    followings: state.user.profile.followings,
    updateFollowing: state.user.profile.updateFollowing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendFollowReq: (...args) => dispatch(sendFollowReq(...args)),
    sendUnfollowReq: (...args) => dispatch(sendUnfollowReq(...args)),
    getFollowings: (...args) => dispatch(getFollowings(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowBtn);
