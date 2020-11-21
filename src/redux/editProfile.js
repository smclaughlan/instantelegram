const { apiBaseUrl, cloudinaryUrl, cloudinaryPreset } = require("../config");

// ACTIONS
const UPDATE_AVATAR = "instantelegram/profile/UPDATE_AVATAR";
const UPDATE_BIO = "instantelegram/profile/UPDATE_BIO";

const setImgUrl = (avatarUrl) => ({
  type: UPDATE_AVATAR,
  avatarUrl,
});

// const updateBio = (newBio) => ({
//   type: UPDATE_BIO,
//   newBio,
// });


// THUNKS

//sends POST request so the current user updates his profile image
export const updateAvatar = (userId, newImg, token) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append("upload_preset", cloudinaryPreset);
    data.append("file", newImg);
    const res = await fetch(`${cloudinaryUrl}/image/upload`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw res;
    const imgObj = await res.json();
    dispatch(setImgUrl(imgObj.secure_url));
    const avatar = imgObj.secure_url;
    const body = JSON.stringify({ userId, avatar, token });
    const resUrl = await fetch(`${apiBaseUrl}/users/${userId}`, {
      method: "PUT",
      body,
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!resUrl.ok) throw resUrl;
  } catch (err) {
    console.error(err);
  }
};

//sends PUT request so the current user updates his bio
export const updateBioReq = (userId, bio, token) => async (dispatch) => {
  try {
    const body = JSON.stringify({ userId, bio, token });
    const res = await fetch(`${apiBaseUrl}/users/${userId}`, {
      method: "PUT",
      body,
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    // const {newBio} = res.json();

    // todo: change to use dispatch to update bio
    // window.location.href = window.location.href;
    return;
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
export default function reducer(state = {}, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_AVATAR: {
      return Object.assign(newState, {
        avatarUrl: action.avatarUrl,
      });
    }
    case UPDATE_BIO: {
      return {
        ...state,
        bio: action.bio,
      };
    }
    default:
      return state;
  }
}
