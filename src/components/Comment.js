import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Comment = (props) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(true);

  const routeToProfile = () => {
    window.location.href = `/profile/${props.commenterId}`;
  };

  const handleDelete = (e) => {
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
          <img className={classes.aviImage} src={props.commenterAvi}></img>
        </Avatar>
        {/* the DeleteIcon will be shown only if current user matches the owner/commenter */}
        {props.commenterId == props.currentUserId ? (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <div />
        )}
      </div>
      <div className="commentContainer">
        <Typography>{props.commenter}</Typography>
        <Typography>{`:  ${props.comment}`}</Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
