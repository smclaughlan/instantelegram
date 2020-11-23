import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { sendFollowReq, sendUnfollowReq } from "../redux/user";
import { getFollowers } from "../redux/user";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const FollowBtn = (props) => {
  const classes = useStyles();

  const handleFollow = async () => {
    props.sendFollowReq(props.currentUserId, props.profileId);
  };

  const handleUnfollow = async () => {
    props.sendUnfollowReq(props.currentUserId, props.profileId);
  };

  //if followers array includes current user, displays unfollow button, otherwise displays follow button
  return props.followers ? (
    props.followers.includes(props.currentUserId) ? (
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
    // loading ... button in case followers array isn't loaded
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
    currentUserId: parseInt(state.user.currentUserId),
    followers: state.user.profile.followers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendFollowReq: (...args) => dispatch(sendFollowReq(...args)),
    sendUnfollowReq: (...args) => dispatch(sendUnfollowReq(...args)),
    getFollowers: (...args) => dispatch(getFollowers(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowBtn);
