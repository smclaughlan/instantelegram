const { apiBaseUrl, cloudinaryUrl, cloudinaryPreset, } = require("../config");

// ACTIONS
const SET_IMG = 'instantelegram/upload/SET_IMG';

const setImgUrl = (previewImgUrl) => (
    {
        type: SET_IMG,
        previewImgUrl,
    }
);

// THUNKSw

export const updateImg = (newImg) => async (dispatch) => {
    try {
        // console.log('YOU JUST ATTEMPTED TO UPLOAD')
        const data = new FormData();
        data.append('file', newImg);
        data.append('upload_preset', cloudinaryPreset);
        const res = await fetch(`${cloudinaryUrl}/image/upload`, {
            method: "POST",
            body: data,
        });
        if (!res.ok) throw res;
        const imgObj = await res.json()
        dispatch(setImgUrl(imgObj.secure_url))
    } catch (err) {
        console.error(err);
    }
}


export const post = (caption, imgUrl, token) => async (dispatch) => {
    try {
        const body = JSON.stringify({ caption, imgUrl, token})
        const res = await fetch(`${apiBaseUrl}/posts`, {
            method: "POST",
            body,
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        // window.location.href = ``;
    } catch (err) {
        console.error(err);
    }
};

// REDUCER
const defaultUploadState = {
    previewImgUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1591723161/Instantelegram/Screen_Shot_2020-06-09_at_10.14.56_AM_jkxk7w.png"
}

export default function reducer(state = defaultUploadState, action) {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
      case SET_IMG: {
        return Object.assign(
            newState,
            {
                previewImgUrl: action.previewImgUrl,
            })
    }
      default: return state;
    }
}
