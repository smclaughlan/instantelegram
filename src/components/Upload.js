import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField, Input, InputLabel } from '@material-ui/core';

import {updateImg, post} from '../redux/upload'

const Upload = (props) => {
    const [caption, setCaption] = useState('')

    const updateValue = cb => e => cb(e.target.value);

    const handleNewImage = e => {
        const newImg = e.target.files[0];
        props.updateImg(newImg);
    }

    const postImg = e => {
        e.preventDefault();
        props.post(caption, props.previewImgUrl, props.token)
        // console.log(props.token)
        props.history.push('/profile')
    }

    return (
      <Container>
        <div>Image Preview:</div>
        <img src={props.previewImgUrl} alt='preview'/>
        <InputLabel htmlFor="image-upload" >Select Image</InputLabel>
        <Input id="image-upload" type="file" label="Image" style={{display: 'none'}} onChange={handleNewImage}/>
        <div>Caption:</div>
        <TextField variant="outlined" type="caption" onChange={updateValue(setCaption)}/>
        <Button color="primary" onClick={postImg} >Post</Button>
      </Container>
    )
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        previewImgUrl: state.upload.previewImgUrl
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
