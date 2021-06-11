import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TimeAgo from "react-timeago";
import "../css/comment.css";
import { deleteComment } from "../redux/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 800,
  },
  aviImage: {
    maxHeight: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Comment = (props) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(true);

  const routeToProfile = () => {
    props.history.push(`/profile/${props.commenterId}`);
  };

  const handleDelete = () => {
    (async () => {
      await props.deleteComment(props.commentId, props.imageId, props.token);
      setDisplay(false);
    })();
  };

  return display ? (
    <Paper className={classes.paper}>
      <div className="commentDetail">
        {/* diplays the owner image of the comment */}
        <Avatar aria-label="commentavi" onClick={routeToProfile}>
          <img
            className={classes.aviImage}
            src={props.commenterAvi}
            alt="Avatar"
          />
        </Avatar>
        <div style={{ marginLeft: "1rem" }}>
          <Typography className="commentOwner" onClick={routeToProfile}>
            {props.commenter}
          </Typography>
          <TimeAgo date={props.timestamp} />
        </div>
        {/* the DeleteIcon will be shown only if current user matches the owner/commenter */}
        {props.commenterId === props.currentUserId ? (
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            style={{ marginLeft: "auto" }}
          >
            <DeleteIcon />
          </IconButton>
        ) : null}
      </div>
      <div className="commentContainer">
        <Typography>{props.comment}</Typography>
      </div>
    </Paper>
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (...args) => dispatch(deleteComment(...args)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
