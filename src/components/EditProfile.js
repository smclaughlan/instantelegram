import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField, Input, InputLabel } from '@material-ui/core';

import { updateAvatar, updateBioReq } from '../redux/editProfile';

const EditProfile = (props) => {
  const [bio, setBio] = useState('')

  const updateValue = cb => e => cb(e.target.value);

  const redirectTo = (address) => {
    window.location.replace(address);
  }

  const handleNewImage = e => {
    const newImg = e.target.files[0];
    let userId = window.location.href.split("/")[4]; //refactor with redux later
    props.updateAvatar(userId, newImg, props.token);
    redirectTo(window.location.href);
  }

  const updateBio = e => {
    e.preventDefault();
    let userId = window.location.href.split("/")[4]; //refactor with redux later
    props.updateBioReq(userId, bio, props.token)
    redirectTo(window.location.href);
    // props.history.push('/profile')
  }

  return (
    <Container>
      <div>Image Preview:</div>
      <img src={props.avatarUrl} alt='preview' width="400" />
      <InputLabel htmlFor="image-upload" >Select Image</InputLabel>
      <Input id="image-upload" type="file" label="Image" style={{ display: 'none' }} onChange={handleNewImage} />
      <div>Bio:</div>
      <TextField variant="outlined" type="caption" onChange={updateValue(setBio)} />
      <div>
        <Button color="primary" onClick={updateBio} >Update bio</Button>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    avatarUrl: state.user.profile.avatarUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: update this with token to lock it down
    updateBioReq: (...args) => dispatch(updateBioReq(...args)),
    updateAvatar: (...args) => dispatch(updateAvatar(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  EditProfile
);
