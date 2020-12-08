import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, TextField, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import "../css/editProfile.css";
import { updateUserProfileReq } from '../redux/user';

const useStyles = makeStyles(theme => ({
  bioUpdate: {
    width: "100%",
  },
  imageLabel: {
    display: 'flex',
  },
}));

const EditProfile = (props) => {
  const [bio, setBio] = useState('')
  const classes = useStyles();

  const updateValue = cb => e => cb(e.target.value);

  const handleNewImage = e => {
    const newImg = e.target.files[0];
    props.updateUserProfileReq(props.currentUserId, props.token, props.profileBio, newImg);
  }

  const updateBio = e => {
    e.preventDefault();
    props.updateUserProfileReq(props.currentUserId, props.token, bio)
  }

  return (
    <Container>
      <div className="update-profile">
        <div>
          <InputLabel
            className={classes.imageLabel}
            htmlFor="image-upload"
            >
            <div
              className="new-image-label"
              onMouseEnter={e => {e.currentTarget.querySelector(`div`).classList.remove('hidden')}}
              onMouseLeave={e => {e.currentTarget.querySelector(`div`).classList.add('hidden')}}
            >
              <img className="new-image" src={props.avatarUrl} alt='preview'/>
              <div className="image-shadow hidden">Edit Avi</div>
            </div>
          </InputLabel>
          <Input id="image-upload" type="file" label="Image" style={{ display: 'none' }} onChange={handleNewImage} />
        </div>

        <div className="update-bio">
          <div>Bio:</div>
          <TextField
            variant="outlined"
            type="caption"
            onChange={updateValue(setBio)}
            className={classes.bioUpdate}
            defaultValue={props.profileBio}
          />
          <div>
            <Button color="primary" onClick={updateBio} >Update bio</Button>
          </div>
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
    updateUserProfileReq: (...args) => dispatch(updateUserProfileReq(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
