import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  TextField,
  Input,
  InputLabel,
} from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { updateImg, post } from "../redux/image";
import "../index.css";
const useStyles = makeStyles((theme) => ({
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
  },
  captionText: {
    margin: "auto",
    width: 400,
  },
}));

const Upload = (props) => {
  const classes = useStyles();
  const [caption, setCaption] = useState("");

  const updateValue = (cb) => (e) => cb(e.target.value);

  const handleNewImage = (e) => {
    const newImg = e.target.files[0];
    props.updateImg(newImg);
  };

  const postImg = (e) => {
    e.preventDefault();
    props.post(caption, props.previewImgUrl, props.token);
    props.history.push("/");
  };

  return (
    <Container className={classes.container}>
      <div className={classes.post}>
        <InputLabel
          htmlFor="image-upload"
          style={{ margin: "20px", marginTop: "100px" }}
        >
          Select Image
        </InputLabel>
        <Input
          id="image-upload"
          type="file"
          label="Image"
          style={{ display: "none", width: "500px", margin: "20px" }}
          onChange={handleNewImage}
          className={classes.img}
        />
      </div>
      <Paper elevation={3} className={classes.paper}>
        <img src={props.previewImgUrl} alt="preview" className={"imgUpload"} />
      </Paper>

      <div className={classes.caption}>
        <TextField
          variant="outlined"
          type="caption"
          onChange={updateValue(setCaption)}
          className={classes.captionText}
          placeholder="Enter caption"
        />
        <Button
          color="primary"
          onClick={postImg}
          className={classes.captionBtn}
          style={{ margin: "20px" }}
        >
          Post
        </Button>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    previewImgUrl: state.image.previewImgUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post: (...args) => dispatch(post(...args)),
    updateImg: (newImg) => dispatch(updateImg(newImg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
