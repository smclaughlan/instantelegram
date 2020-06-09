import { apiBaseUrl } from '../config';

const LOGIN_USER = 'instantelegram/login/LOGIN_USER';
const LOGOUT_USER = 'instantelegram/logout/LOGOUT_USER';
const USER_PROFILE = 'instantelegram/profile/USER_PROFILE';

export const loginUser = token => ({ type: LOGIN_USER, token });
export const logoutUser = () => ({ type: LOGOUT_USER });
export const getUserProfile = (id, username, bio) => ({ type: USER_PROFILE, id, username, bio });

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
    const { token } = await res.json();
    window.localStorage.setItem("x-access-token", token);
    dispatch(loginUser(token));
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
    const { token } = await res.json()
    window.localStorage.setItem("x-access-token", token)
    dispatch(loginUser(token))
  }
}

export const sendLogoutReq = () => async dispatch => {
  window.localStorage.removeItem("x-access-token")
  dispatch(logoutUser())
}

export const getUserProfileReq = (id) => async dispatch => {
  const res = await fetch(`${apiBaseUrl}/api/users/${id}`);
  if (res.ok) {
    const resJson = await res.json();
    const username = resJson.username;
    const bio = resJson.bio;
    dispatch(getUserProfile(id, username, bio));
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        token: action.token,
      }
    }
    case LOGOUT_USER: {
      delete state.token;
      return {
        ...state,
      }
    }
    case USER_PROFILE: {
      return {
        ...state,
        state: {
          profile: {
            id: action.id,
            username: action.username,
            bio: action.bio,
          }
        }
      }
    }
    default: return state;
  }
}
