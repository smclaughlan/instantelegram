import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Avatar,
  IconButton,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TimeAgo from "react-timeago";
import "../css/comment.css";
import { editComment, deleteComment } from "../redux/user";

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
  const [displayCommentEdit, setDisplayCommentEdit] = useState(false);
  const [newCommentBody, setnewCommentBody] = useState("");

  const routeToProfile = () => {
    props.history.push(`/profile/${props.commenterId}`);
  };

  // const handleEdit = () => {
  //   (async () => {
  //     await props.editComment(props.commentId, , props.token);
  //     setDisplay(false);
  //   })();
  // };

  // const handleDelete = () => {
  //   (async () => {
  //     await props.deleteComment(props.commentId, props.imageId, props.token);
  //     setDisplay(false);
  //   })();
  // };

  return (
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
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              aria-label="delete"
              onClick={() => setDisplayCommentEdit(!displayCommentEdit)}
              style={{ marginLeft: "auto" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() =>
                deleteComment(props.commentId, props.imageId, props.token)
              }
              style={{ marginLeft: "auto" }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
      <div className="commentContainer">
        {displayCommentEdit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.editComment(
                props.commentId,
                newCommentBody,
                props.token,
                props.imageId
              );
              setDisplayCommentEdit(false);
            }}
          >
            <TextField
              defaultValue={props.comment}
              placeholder={props.comment}
              className={classes.captionUpdate}
              variant="outlined"
              type="caption"
              onChange={(e) => setnewCommentBody(e.target.value)}
              style={{ marginBottom: "1rem", width: "100%" }}
            />
            {newCommentBody.length > 0 && newCommentBody !== props.comment ? (
              <Button
                className={classes.commentButton}
                variant="outlined"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            ) : (
              <Button
                className={classes.commentButton}
                variant="outlined"
                color="primary"
                type="submit"
                disabled
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            )}
          </form>
        ) : (
          <Typography>{props.comment}</Typography>
        )}
      </div>
    </Paper>
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
    editComment: (...args) => dispatch(editComment(...args)),
    deleteComment: (...args) => dispatch(deleteComment(...args)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
