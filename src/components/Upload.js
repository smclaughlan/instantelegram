import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField, Input, InputLabel } from '@material-ui/core';
// import Image from './Image';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { updateImg, post } from '../redux/image'

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: 500,
    maxHeight: 500,
  },
  post: {
    margin: 'auto',
    maxWidth: 500,
    maxHeight: 500,
  },
  caption: {
    margin: 'auto',
    width: 500,
    height: 500,

  },
  paper: {
    maxWidth: 500,
    maxHeight: 500,
    margin: 'auto',
    justifyContent: 'space-around',

  },





}));

const Upload = (props) => {
  const classes = useStyles();
  const [caption, setCaption] = useState('')

  const updateValue = cb => e => cb(e.target.value);

  const handleNewImage = e => {
    const newImg = e.target.files[0];
    props.updateImg(newImg);
  }

  const postImg = e => {
    e.preventDefault();
    props.post(caption, props.previewImgUrl, props.token)
    props.history.push('/profile')
  }

  return (
    <Container className={classes.container}>
      <div className={classes.post} >
        <InputLabel htmlFor="image-upload"  >Select Image</InputLabel>
        <Input id="image-upload" type="file" label="Image" style={{ display: 'none' }} onChange={handleNewImage} className={classes.img} />
      </div>
      <Paper elevation={3} className={classes.paper} >
        {/* <div>Image Preview:</div> */}
        <img src={props.previewImgUrl} alt='preview' />
      </Paper>
      {/* <div className={classes.post} > */}
      {/* <InputLabel htmlFor="image-upload"  >Select Image</InputLabel>
        <Input id="image-upload" type="file" label="Image" style={{ display: 'none' }} onChange={handleNewImage} /> */}
      {/* <div >Caption:</div> */}
      <div className={classes.caption}>
        <TextField variant="outlined" type="caption" onChange={updateValue(setCaption)} />
        <Button color="primary" onClick={postImg}  >Post</Button>
      </div>
      {/* </div> */}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    previewImgUrl: state.image.previewImgUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: update this with token to lock it down
    post: (...args) => dispatch(post(...args)),
    updateImg: (newImg) => dispatch(updateImg(newImg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Upload
);
