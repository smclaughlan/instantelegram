import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { getFeedPostReq, getUserProfileReq } from "../redux/user";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "@material-ui/core";
import { getUserIds } from "../redux/search";
import { motion } from "framer-motion";

import { pageVariants } from "../App";
import Image from "./Image";
import "../css/feed.css";

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
  const {
    currentUserId,
    getFeedPostReq,
    getUserProfileReq,
    getUserIds,
    token,
  } = props;
  React.useEffect(() => {
    getFeedPostReq(currentUserId);
    getUserProfileReq(currentUserId);
    getUserIds(token);
  }, [currentUserId, getFeedPostReq, getUserProfileReq, getUserIds, token]);

  const classes = useStyles();
  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={pageVariants}
      className="motion-div"
    >
      {props.feedPosts && props.user ? (
        <div className={classes.root}>
          <Container className={classes.topLogo}>
            <img
              alt={"Instantelegram logo"}
              id="instantelegram-logo"
              src={"images/logoIG.png"}
              style={{
                margin: "32px auto",
                borderRadius: "5px",
                maxWidth: "950px",
              }}
            ></img>
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
              {props.feedPosts
                .sort((a, b) => {
                  const timeA = new Date(a.timestamp).getTime();
                  const timeB = new Date(b.timestamp).getTime();
                  return timeA < timeB ? 1 : -1;
                })
                .map((post) => {
                  return (
                    <Grid item className={classes.column1} key={post.postId}>
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
                  );
                })}
            </Grid>
          </Paper>
        </div>
      ) : (
        <CircularProgress
          size="100px"
          style={{
            marginLeft: "calc(50% - 50px)",
            top: "40%",
            position: "absolute",
          }}
        />
      )}
    </motion.div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    feedPosts: state.user.feedPosts,
    user: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeedPostReq: (...args) => dispatch(getFeedPostReq(...args)),
    getUserProfileReq: (...args) => dispatch(getUserProfileReq(...args)),
    getUserIds: (...args) => dispatch(getUserIds(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
