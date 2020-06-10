import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { sendFollowReq, sendUnfollowReq } from '../redux/user';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const FollowBtn = (props) => {
  const classes = useStyles();
  const [followed, setFollowed] = React.useState("not following");

  const handleFollow = async () => {
    let followedId = window.location.href.split("/")[4];
    let userId = window.localStorage.getItem("currentUserId");
    props.sendFollowReq(userId, followedId);
    setFollowed("following");
  }

  const handleUnfollow = async () => {
    let followedId = window.location.href.split("/")[4];
    let userId = window.localStorage.getItem("currentUserId");
    props.sendUnfollowReq(userId, followedId);
    setFollowed("not following");
  }

  return (followed === "not following" ?
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleFollow}>
        Follow
      </Button>
    </div>
    :
    <div>
      <Button variant="contained" color="primary" onClick={handleUnfollow}>
        Unfollow
      </Button>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendFollowReq: (...args) => dispatch(sendFollowReq(...args)),
    sendUnfollowReq: (...args) => dispatch(sendUnfollowReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  FollowBtn
);
