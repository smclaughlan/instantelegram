import { apiBaseUrl } from '../config';

const LOGIN_USER = 'instantelegram/login/LOGIN_USER';
const LOGOUT_USER = 'instantelegram/logout/LOGOUT_USER';
const USER_PROFILE = 'instantelegram/profile/USER_PROFILE';
const FOLLOW = 'instantelegram/profile/FOLLOW';
const UNFOLLOW = 'instantelegram/profile/UNFOLLOW';
const UPDATE_CAPTION = 'instantelegram/image/UPDATE_CAPTION';
const UPDATE_LIKE = 'instantelegram/like/UPDATE_LIKE';

export const loginUser = (token, currentUserId) => ({ type: LOGIN_USER, token, currentUserId });
export const logoutUser = () => ({ type: LOGOUT_USER });
export const getUserProfile = (id, username, bio, avatarUrl, posts, likes) => ({ type: USER_PROFILE, id, username, bio, avatarUrl, posts, likes });
export const sendUserFollowReq = (userId, followedId) => ({ type: FOLLOW, userId, followedId });
export const sendUserUnfollowReq = (userId, followedId) => ({ type: UNFOLLOW, userId, followedId });
export const updateCaption = (postObj, imageId) => ({ type: UPDATE_CAPTION, postObj, imageId})
export const updateLike = (imageId, likesArr) => ({ type: UPDATE_LIKE, imageId, likesArr})

export const sendRegisterReq = (userInfo) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/api/session/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userInfo.username,
      email: userInfo.email,
      bio: userInfo.bio,
      hashed_password: userInfo.password
    }),
  })

  if (res.ok) {
    const { token, currentUserId } = await res.json();
    window.localStorage.setItem("x-access-token", token);
    window.localStorage.setItem("currentUserId", currentUserId);
    dispatch(loginUser(token, currentUserId));
  }
}

export const sendLoginReq = (userInfo) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/api/session/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userInfo.username,
      password: userInfo.password
    }),
  })

  if (res.ok) {
    const { token, currentUserId } = await res.json()
    window.localStorage.setItem("x-access-token", token);
    window.localStorage.setItem("currentUserId", currentUserId);
    dispatch(loginUser(token, currentUserId))
  }
}

export const sendLogoutReq = () => async dispatch => {
  window.localStorage.removeItem("x-access-token");
  window.localStorage.removeItem("currentUserId");
  dispatch(logoutUser())
}

export const getUserProfileReq = (id) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/api/users/${id}`);
  const res2 = await fetch(`${apiBaseUrl}/posts/${id}`);
  const res3 = await fetch(`${apiBaseUrl}/likes/`);
  if ((res.ok && res2.ok) && res3.ok) {
    const resJson = await res.json();
    const posts = await res2.json();
    const likes = await res3.json();
    const username = resJson.username;
    const bio = resJson.bio;
    const avatarUrl = resJson.avatarUrl;
    // console.log(posts);
    dispatch(getUserProfile(id, username, bio, avatarUrl, posts, likes));
  }
}

export const sendFollowReq = (userId, followedId) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/api/users/${followedId}/follow`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
    })
  });
  if (res.ok) {
    dispatch(sendUserFollowReq(userId, followedId));
  }
}
export const sendUnfollowReq = (userId, followedId) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/api/users/${followedId}/follow`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
    })
  });
  if (res.ok) {
    dispatch(sendUserUnfollowReq(userId, followedId));
  }
}

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
      const postObj = await res.json();
      const imgId = postObj.id;
      delete postObj['id'];
    //   console.log(postObj)
      dispatch(updateCaption(postObj, imgId));

      return
  } catch (err) {
      console.error(err);
  }
};

export const createLike = (imageId, token) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/posts/${imageId}/likes`, {
            method: "POST",
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        const data = await res.json();
        const likesArr = data.data
        dispatch(updateLike(imageId, likesArr))
        return
    } catch (err) {
        console.error(err)
    }
}

export const deleteLike = (imageId, token) => async (dispatch) => {
    try {
        const res = await fetch(`${apiBaseUrl}/posts/${imageId}/likes`, {
            method: "DELETE",
            headers: {
                "x-access-token": `${token}`,
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) throw res;
        const data = await res.json();
        const likesArr = data.data
        dispatch(updateLike(imageId, likesArr))
        return
    } catch (err) {
        console.error(err)
    }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        token: action.token,
        currentUserId: action.currentUserId,
      }
    }
    case LOGOUT_USER: {
      delete state.token;
      delete state.currentUserId;
      return {
        ...state,
      }
    }
    case USER_PROFILE: {
      return {
        profile: {
          id: action.id,
          username: action.username,
          bio: action.bio,
          avatarUrl: action.avatarUrl,
        },
        posts: action.posts,
        likes: action.likes,
        ...state,
      }
    }
    case FOLLOW: {
      if (state.follows) {
        state.follows.push(action.followedId);
      } else {
        state.follows = [action.followedId];
      }
      return {
        ...state,
      }

    }

    case UNFOLLOW: {
      if (state.follows) {
        let idx = state.follows.indexOf(action.followedId);
        let arr1 = state.follows.slice(0, idx);
        let arr2 = state.follows.slice(idx + 1);
        state.follows = arr1.concat(arr2);
      }
      return {
        ...state,
      }

    }

    case UPDATE_CAPTION: {
        const newState = Object.assign({}, state)
        // console.log(action.imageId)
        newState.posts[action.imageId] = action.postObj
      return newState
    }

    case UPDATE_LIKE: {
        const newState = Object.assign({}, state)
        // console.log(action.imageId)
        newState.likes[action.imageId] = action.likesArr
      return newState
    }

    default: return state;
  }
}
