import { apiBaseUrl } from '../config';

const LOGIN_USER = 'instantelegram/login/LOGIN_USER';
const LOGOUT_USER = 'instantelegram/logout/LOGOUT_USER';
const USER_PROFILE = 'instantelegram/profile/USER_PROFILE';

export const loginUser = (token, currentUserId) => ({ type: LOGIN_USER, token, currentUserId });
export const logoutUser = () => ({ type: LOGOUT_USER });
export const getUserProfile = (id, username, bio, avatarUrl) => ({ type: USER_PROFILE, id, username, bio, avatarUrl });

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
        ...state,
      }
    }
    default: return state;
  }
}
