import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { getFeedPostReq, getUserProfileReq } from "../redux/user";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "@material-ui/core";

import Image from "./Image";
import '../css/feed.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  paper: {
    padding: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  gridList: {
    justifyContent: "space-around",
    maxWidth: 500,
    height: 450,
  },
  topLogo: {
    justifyContent: "space-around",
    margin: "0 auto",
    maxWidth: 1000,
  },
}));

function Feed(props) {
  React.useEffect(() => {
    let id = props.currentUserId;
    props.getFeedPostReq(id);
    props.getUserProfileReq(id);
  }, []);

  if (props.feedPosts) {
    props.feedPosts.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  const classes = useStyles();
  return (
    (props.feedPosts && props.user) ?
      <div className={classes.root}>
        <Container className={classes.topLogo}>
          <img alt={"Instantelegram logo"} id='instantelegram-logo' src={"images/logoIG.png"} style={{ margin: '32px auto', borderRadius: '5px', maxWidth: '950px' }}></img>
        </Container>
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignContent="center"
            alignItems="flex-start"
          >
            {props.feedPosts.map((post) => {
              return (
                <Grid item className={classes.column1}>
                  <Image
                    imageId={post.postId}
                    postDate={post.timestamp}
                    imageUrl={post.imageUrl}
                    imageCapt={post.caption}
                    imagePosterUsername={post.username}
                    imagePosterAviUrl={post.avatarUrl}
                    imagePosterId={post.userId}
                  />
                </Grid>
              )
            })}
          </Grid>
        </Paper>
      </div >
      :
      <CircularProgress
        size='100px'
        style={{
          alignSelf: 'center',
          top: '40%',
          position: 'relative',
        }}
      />
  )

}

const mapStateToProps = (state) => {
  return {
    feedPosts: state.user.feedPosts,
    user: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedPostReq: (...args) => dispatch(getFeedPostReq(...args)),
    getUserProfileReq: (...args) => dispatch(getUserProfileReq(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
