import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  }
}));

const Image = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(props)

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img className={classes.aviImage} src="https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589817904/bw2djxdddpa1mjpshity.jpg" alt="avatarImg"/>
          </Avatar>
        }
        title={`${props.imagePosterUsername}`}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="https://res.cloudinary.com/dgzcv1mcs/image/upload/v1591737637/bafisqqblpyxx5lx91fx.jpg"
        title="image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          CJ
        </Typography>
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

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Image);
