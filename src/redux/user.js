import { apiBaseUrl } from '../config';

const LOGIN_USER = 'instantelegram/login/LOGIN_USER';
const LOGOUT_USER = 'instantelegram/logout/LOGOUT_USER';
const USER_PROFILE = 'instantelegram/profile/USER_PROFILE';
const FOLLOW = 'instantelegram/profile/FOLLOW';
const UNFOLLOW = 'instantelegram/profile/UNFOLLOW';

export const loginUser = (token, currentUserId) => ({ type: LOGIN_USER, token, currentUserId });
export const logoutUser = () => ({ type: LOGOUT_USER });
export const getUserProfile = (id, username, bio, avatarUrl) => ({ type: USER_PROFILE, id, username, bio, avatarUrl });
export const sendUserFollowReq = (userId, followedId) => ({ type: FOLLOW, userId, followedId });
export const sendUserUnfollowReq = (userId, followedId) => ({ type: UNFOLLOW, userId, followedId });
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
  if (res.ok) {
    const resJson = await res.json();
    const username = resJson.username;
    const bio = resJson.bio;
    const avatarUrl = resJson.avatarUrl;
    dispatch(getUserProfile(id, username, bio, avatarUrl));
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
        //posts: will be a array of post objects, contain each profile's posts for that page
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

    default: return state;
  }
}
