import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  TextField,
  Input,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateBioReq } from "../redux/user";
import { updateAvatar } from "../redux/user";

const useStyles = makeStyles((theme) => ({
  bioUpdate: {
    width: "100%",
  },
}));

const EditProfile = (props) => {
  const [bio, setBio] = useState("");
  const [newProfileImg, setNewProfileImg] = useState(null);
  const classes = useStyles();
  let userId = window.location.href.split("/")[4];

  const updateBio = (e) => {
    e.preventDefault();
    props.updateBioReq(userId, bio, props.token);
  };

  const updateProfileImg = () => {
    let imgFormData = new FormData();
    imgFormData.append("profileImage", newProfileImg);

    props.updateAvatar(userId, imgFormData, props.token);
  };

  return (
    <Container style={{ display: "grid", gridGap: "32px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* <div style={{ alignSelf: "center" }}>Image Preview:</div> */}
        <img
          src={
            newProfileImg !== null
              ? URL.createObjectURL(newProfileImg)
              : props.avatarUrl
          }
          alt="preview"
          width="400"
          style={{
            alignSelf: "center",
            height: "20rem",
            marginTop: "2rem",
            width: "20rem",
          }}
        />

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <InputLabel
            style={
              newProfileImg !== null
                ? {
                    alignSelf: "center",
                    boxShadow: "1px 1px 6px 0 rgba(0, 0, 0, 0.3)",
                    color: "#8E6BC7",
                    cursor: "pointer",
                    marginRight: "2rem",
                    padding: "1rem",
                  }
                : {
                    alignSelf: "center",
                    boxShadow: "1px 1px 6px 0 rgba(0, 0, 0, 0.3)",
                    color: "#8E6BC7",
                    cursor: "pointer",
                    padding: "1rem",
                  }
            }
            htmlFor="image-upload"
          >
            Select Image
          </InputLabel>
          <Input
            id="image-upload"
            type="file"
            label="Image"
            style={{ display: "none" }}
            onChange={(e) => setNewProfileImg(e.target.files[0])}
          />
          {newProfileImg !== null ? (
            <div
              style={{
                boxShadow: "1px 1px 6px 0 rgba(0, 0, 0, 0.3)",
                color: "#8E6BC7",
                cursor: "pointer",
                fontFamily: "Verdana",
                fontSize: "1rem",
                fontWeight: "400",
                lineHeight: "1",
                padding: "1rem",
              }}
              onClick={updateProfileImg}
            >
              Update Profile Image
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div>Bio:</div>
        <TextField
          variant="outlined"
          type="caption"
          onChange={(e) => setBio(e.target.value)}
          className={classes.bioUpdate}
          defaultValue={props.profileBio}
        />
        <div>
          <Button color="primary" onClick={updateBio}>
            Update bio
          </Button>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    avatarUrl: state.user.profile.avatarUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO: update this with token to lock it down
    updateBioReq: (...args) => dispatch(updateBioReq(...args)),
    updateAvatar: (...args) => dispatch(updateAvatar(...args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
