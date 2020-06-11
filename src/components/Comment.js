import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Paper} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20,
        maxWidth: 800,
    },
    aviImage: {
        maxHeight: "100%",
    },
}))

const Comment = (props) => {
  const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Avatar aria-label="commentavi">
                <img className={classes.aviImage} src={props.commenterAvi}></img>
            </Avatar>

            <Typography>
                {props.commenter} :
            </Typography>
            <Typography>
                {props.comment}
            </Typography>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
      token: state.user.token,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
    //   post: (...args) => dispatch(post(...args)),
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comment);
