import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField, Input, InputLabel } from '@material-ui/core';
// import { makeStyles } from "@material-ui/core/styles";

import { updateAvatar, updateBioReq } from '../redux/editProfile';

// const useStyles = makeStyles(theme => ({
//   bioUpdate: {
//     width: "100%",
//   },
// }));

const EditProfile = (props) => {
  const [bio, setBio] = useState('')
  // const classes = useStyles();

  const updateValue = cb => e => cb(e.target.value);

  const handleNewImage = e => {
    const newImg = e.target.files[0];
    props.updateAvatar(props.currentUserId, newImg, props.token);
  }

  const updateBio = e => {
    e.preventDefault();
    props.updateBioReq(props.currentUserId, bio, props.token)
  }

  return (
    <Container>
      <div>
        <InputLabel htmlFor="image-upload" >
          <img src={props.avatarUrl} alt='preview' width="100" />
          <div>select new image</div>
        </InputLabel>
        <Input id="image-upload" type="file" label="Image" style={{ display: 'none' }} onChange={handleNewImage} />
      </div>

      <div>
        <div>Bio:</div>
        <TextField
          variant="outlined"
          type="caption"
          onChange={updateValue(setBio)}
          // className={classes.bioUpdate}
          defaultValue={props.profileBio}
        />
        <div>
          <Button color="primary" onClick={updateBio} >Update bio</Button>
        </div>
      </div>

    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
    avatarUrl: state.user.profile.avatarUrl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBioReq: (...args) => dispatch(updateBioReq(...args)),
    updateAvatar: (...args) => dispatch(updateAvatar(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
