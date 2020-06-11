import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { sendFollowReq, sendUnfollowReq } from '../redux/user';
import { getFeedPostReq } from '../redux/user';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const FollowBtn = (props) => {
  const classes = useStyles();
  // const [followed, setFollowed] = React.useState("not following");
  let followedId = window.location.href.split("/")[4];
  let testFollow = false
  React.useEffect(() => {
    let userId = parseInt(window.localStorage.getItem("currentUserId"));
    props.getFeedPostReq(userId);
  }, []);

  const handleFollow = async () => {
    // let followedId = window.location.href.split("/")[4];
    let userId = window.localStorage.getItem("currentUserId");
    props.sendFollowReq(userId, followedId);
    // setFollowed("following");
    testFollow = true
  }

  const handleUnfollow = async () => {
    // let followedId = window.location.href.split("/")[4];
    let userId = window.localStorage.getItem("currentUserId");
    props.sendUnfollowReq(userId, followedId);
    // setFollowed("not following");
  }

  // return (followed === "not following" ?
  return (
    props.followings ?
      (props.followings[parseInt(window.location.href.split("/")[4])] ?
        // (followedId ?
        // (testFollow ?
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={handleUnfollow}>
            UnFollow
          </Button>
        </div>
        :
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={handleFollow}>
            Follow
      </Button>
        </div>
      ) :
      <h1>Loading</h1>

  )
}


const mapStateToProps = state => {
  return {
    token: state.user.token,
    followings: state.user.followings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendFollowReq: (...args) => dispatch(sendFollowReq(...args)),
    sendUnfollowReq: (...args) => dispatch(sendUnfollowReq(...args)),
    getFeedPostReq: (...args) => dispatch(getFeedPostReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  FollowBtn
);
