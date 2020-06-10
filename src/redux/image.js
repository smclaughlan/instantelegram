const { apiBaseUrl, cloudinaryUrl, cloudinaryPreset, } = require("../config");

// ACTIONS
const SET_IMG = 'instantelegram/upload/SET_IMG';

const setImgUrl = (previewImgUrl) => (
    {
        type: SET_IMG,
        previewImgUrl,
    }
);

// THUNKS
export const updateImg = (newImg) => async (dispatch) => {
    try {
        const data = new FormData();
        data.append('upload_preset', cloudinaryPreset);
        data.append('file', newImg);
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
        console.log(token)
        const res = await fetch(`${apiBaseUrl}/posts/`, {
            method: "POST",
            body,
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        return
    } catch (err) {
        console.error(err);
    }
};


export const updateCapt = (caption, imageId, token) => async (dispatch) => {
    try {
        const body = JSON.stringify({ caption, token })
        const res = await fetch(`${apiBaseUrl}/posts/${imageId}`, {
            method: "PUT",
            body,
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        const postObj = await res.json()
        console.log(postObj)
        return
    } catch (err) {
        console.error(err);
    }
};

export const deletePost = (imageId, token) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/posts/${imageId}`, {
            method: "DELETE",
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        const message = await res.json()
        console.log(message)
        return
    } catch (err) {
        console.error(err)
    }
}

// REDUCER
export default function reducer(state = {}, action) {
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
