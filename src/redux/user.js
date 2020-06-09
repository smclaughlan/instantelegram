import { apiBaseUrl } from '../config';

const LOGIN_USER = 'instantelegram/login/LOGIN_USER';
const LOGOUT_USER = 'instantelegram/logout/LOGOUT_USER';

export const loginUser = token => ({ type: LOGIN_USER, token });
export const logoutUser = () => ({ type: LOGOUT_USER });

export const sendRegisterReq = (userInfo) => async dispatch => {
  console.log(`sendRegisterReq function ran, ${apiBaseUrl}`);
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
  //TODO: Send login request
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
  // window.localStorage.removeItem("x-access-token")// need to upadte the actual name of the key
  dispatch(logoutUser())
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
    default: return state;
  }
}
