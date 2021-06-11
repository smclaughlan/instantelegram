import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  TextField,
  Input,
  InputLabel,
} from "@material-ui/core";
import { motion } from "framer-motion";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { pageVariants } from "../App";
import { post } from "../redux/image";
import "../index.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    "flex-flow": "column",
  },

  post: {
    margin: "auto",
    maxWidth: 500,
    maxHeight: 500,
  },
  caption: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: 500,
  },
  paper: {
    width: 500,
    height: 500,
    margin: "auto",
    justifyContent: "space-around",
  },
  captionBtn: {
    margin: "auto",
    width: 100,
    height: "100%",
  },
  captionText: {
    margin: "auto",
    width: 400,
  },
}));

const Upload = (props) => {
  const classes = useStyles();
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = React.useState(null);

  const postImg = (e) => {
    e.preventDefault();
    let postFormData = new FormData();
    postFormData.append("caption", caption);
    postFormData.append("image", postImage);
    props.post(postFormData, props.token);
  };

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={pageVariants}
      className="motion-div"
    >
      <Container className={classes.container} style={{ padding: "2rem 0" }}>
        <div className={classes.post}>
          <InputLabel
            htmlFor="image-upload"
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "1px 1px 6px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              marginBottom: "1.5rem",
              padding: "1.5rem",
            }}
            className="image-upload-select"
          >
            Select Image
          </InputLabel>
          <Input
            id="image-upload"
            type="file"
            label="Image"
            style={{ display: "none", width: "500px", margin: "20px" }}
            onChange={(e) => setPostImage(e.target.files[0])}
            className={classes.img}
            inputProps={{ accept: "image/*" }}
          />
        </div>
        <Paper elevation={3} className={classes.paper}>
          {postImage ? (
            <img
              src={URL.createObjectURL(postImage)}
              alt="preview"
              className={"imgUpload"}
            />
          ) : (
            <div></div>
          )}
        </Paper>

        <div className={classes.caption}>
          <TextField
            variant="outlined"
            type="caption"
            onChange={(e) => setCaption(e.target.value)}
            className={classes.captionText}
            placeholder="Enter caption"
          />
          {postImage !== null ? (
            <Button
              color="primary"
              onClick={postImg}
              className={classes.captionBtn}
            >
              Post
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={postImg}
              className={classes.captionBtn}
              disabled
            >
              Post
            </Button>
          )}
        </div>
      </Container>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post: (...args) => dispatch(post(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
