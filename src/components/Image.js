import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import {
  updateCapt,
  createLike,
  deleteLike,
  createComment,
  deletePostReq,
} from "../redux/user";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  aviImage: {
    maxHeight: "100%",
    '&:hover': {
      cursor: 'pointer',
    },
  },
  captionUpdate: {
    width: "100%",
  },
  captButton: {
    width: "50%",
  },
  commentButton: {
    width: "100%",
  },
}));

const Image = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editCaptionBool, setEditCaptionBool] = useState("none");
  const [editTypographyBool, setEditTypographyBool] = useState("grid");
  const [likeState, setLikeState] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [upd, setUpd] = useState(1);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    if (props.imageLikes[props.imageId]) {
      setNumOfLikes(props.imageLikes[props.imageId].length);
      if (
        props.imageLikes[props.imageId].includes(parseInt(props.currentUserId))
      ) {
        setLikeState(true);
      }
    }
  }, []);

  const handleEdit = () => {
    setEditCaptionBool("flex");
    setEditTypographyBool("none");
    handleClose();
  };

  const handleDelete = () => {
    props.deletePost(props.imageId, props.token);
  };

  const handleLike = () => {
    if (likeState) {
      props.deleteLike(props.imageId, props.token);
      setLikeState(false);
      setNumOfLikes(numOfLikes - 1);
    } else {
      props.createLike(props.imageId, props.token);
      setLikeState(true);
      setNumOfLikes(numOfLikes + 1);
    }
  };

  const cancelEdit = () => {
    setEditCaptionBool("none");
    setEditTypographyBool("grid");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const newCaption = e.target[0].value;
    props.updateCapt(newCaption, props.imageId, props.token);
    cancelEdit();
  };

  const enableButtonCheck = (e) => {
    if (e.target.value.length > 0) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }

  const submitComment = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      const newComment = e.target[0].value;
      e.target[0].value = "";
      (async () => {
        await props.createComment(props.imageId, newComment, props.token);
        setUpd(upd + 1);
        setSubmitEnabled(false);
      })();
    }
  };

  const clickAvi = () => {
    window.location.href = `/profile/${props.imagePosterId}`;
  }

  const editButton =
    parseInt(props.currentUserId) == props.imagePosterId ? (
      <>
        <IconButton aria-label="settings" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </>
    ) : (
        <></>
      );

  const timestampDate = new Date(props.postDate);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img
              className={classes.aviImage}
              src={props.imagePosterAviUrl}
              alt="avatarImg"
              onClick={clickAvi}
            />
          </Avatar>
        }
        action={editButton}
        title={`${props.imagePosterUsername}`}
        subheader={`${timestampDate.toDateString()}`}
      />
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title="image"
      />
      <CardContent>
        <Typography
          style={{ display: editTypographyBool }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.imageCapt}
        </Typography>
        <form style={{ display: editCaptionBool }} onSubmit={submitEdit}>
          <TextField
            defaultValue={props.imageCapt}
            className={classes.captionUpdate}
            variant="outlined"
            type="caption"
          />
          <Button
            className={classes.captButton}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            className={classes.captButton}
            variant="outlined"
            color="secondary"
            onClick={cancelEdit}
          >
            Cancel
          </Button>
        </form>
      </CardContent>
      <CardActions disableSpacing>
        {likeState ? (
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon color="secondary" />
          </IconButton>
        ) : (
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <FavoriteIcon />
            </IconButton>
          )}
        <div>{numOfLikes}</div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={submitComment}>
            <TextField
              placeholder="leave a comment"
              className={classes.captionUpdate}
              variant="outlined"
              type="caption"
              onChange={enableButtonCheck}
            />
            {submitEnabled ?
              <Button
                className={classes.commentButton}
                variant="outlined"
                color="primary"
                type="submit"
              >
                Submit
            </Button>
              :
              <Button
                className={classes.commentButton}
                variant="outlined"
                color="primary"
                type="submit"
                disabled
              >
                Submit
            </Button>
            }
          </form>
          {props.comments[props.imageId] ? (
            Object.keys(props.comments[props.imageId]).map((key) => {
              return (
                <Comment
                  key={key}
                  commentId={key}
                  imageId={props.imageId}
                  commenterId={props.comments[props.imageId][key].commenterId}
                  commenterAvi={props.comments[props.imageId][key].commenterAvi}
                  commenter={props.comments[props.imageId][key].commenter}
                  comment={props.comments[props.imageId][key].body}
                />
              );
            })
          ) : (
              <div></div>
            )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
    imageLikes: state.user.likes,
    comments: state.user.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCapt: (...args) => dispatch(updateCapt(...args)),
    deletePost: (...args) => dispatch(deletePostReq(...args)),
    createLike: (...args) => dispatch(createLike(...args)),
    deleteLike: (...args) => dispatch(deleteLike(...args)),
    createComment: (...args) => dispatch(createComment(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Image);
