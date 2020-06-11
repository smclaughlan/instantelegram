import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField, Card, CardHeader,
  CardMedia, CardContent, CardActions,
  Collapse, Menu, MenuItem,
  Avatar, IconButton, Typography,
  Button
} from '@material-ui/core';
import { deletePost } from '../redux/image'
import { updateCapt } from '../redux/user'
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "100%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  aviImage: {
    maxHeight: "100%",
  },
  captionUpdate: {
    width: "100%",
  },
  captButton: {
    width: "50%"
  }
}));

const Image = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editCaptionBool, setEditCaptionBool] = React.useState('none');
  const [editTypographyBool, setEditTypographyBool] = React.useState('grid');

  const handleEdit = () => {
    setEditCaptionBool('flex')
    setEditTypographyBool('none')
    handleClose()
  }

  const handleDelete = () => {
    props.deletePost(props.imageId, props.token)
  }

  const cancelEdit = () => {
    setEditCaptionBool('none')
    setEditTypographyBool('grid')
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const submitEdit = e => {
    e.preventDefault()
    const newCaption = e.target[0].value;
    props.updateCapt(newCaption, props.imageId, props.token)
    cancelEdit()
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img className={classes.aviImage} src={props.imagePosterAviUrl} alt="avatarImg" />
          </Avatar>
        }
        action={
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
        }
        title={`${props.imagePosterUsername}`}
        subheader={`${props.postDate}`}
      />
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title="image"
      />
      <CardContent>
        <Typography style={{ display: editTypographyBool }} variant="body2" color="textSecondary" component="p">
          {props.imageCapt}
        </Typography>
        <form style={{ display: editCaptionBool }} onSubmit={submitEdit}>
          <TextField
            defaultValue={props.imageCapt}
            className={classes.captionUpdate}
            variant="outlined"
            type="caption"
          />
          <Button className={classes.captButton} variant="outlined" color="primary" type="submit">
            Submit
          </Button>
          <Button className={classes.captButton} variant="outlined" color="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
        </form>


      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
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
          <Typography paragraph>
            Comment 1
          </Typography>
          <Typography paragraph>
            Comment 2
          </Typography>
          <Typography paragraph>
            Comment 3
          </Typography>
          <Typography>
            Comment 4
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}



const mapStateToProps = state => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCapt: (...args) => dispatch(updateCapt(...args)),
    deletePost: (...args) => dispatch(deletePost(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
