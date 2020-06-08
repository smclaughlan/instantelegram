const LOGIN_USER = 'instantelegram/login/LOGIN_USER'

export const loginUser = token => ({ type: LOGIN_USER, token });

export const sendRegisterReq = (userInfo) => async dispatch => {
  //TODO: Send register request
  const res = await fetch()

  if (res.ok) {
    dispatch(loginUser(/* Login info */))
  }
}

export const sendLoginReq = (userInfo) => async dispatch => {
  //TODO: Send login request
  const res = await fetch()

  if (res.ok) {
    dispatch(loginUser(/* Login info */))
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
    default: return state;
  }
}
