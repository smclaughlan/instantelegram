// ACTIONS

// const LOGIN_USER = 'instantelegram/login/LOGIN_USER'


// THUNKS

// export const sendLoginReq = (userInfo) => async dispatch => {
//     //TODO: Send login request
//     const res = await fetch()

//     if (res.ok) {
//       dispatch(loginUser(/* Login info */))
//     }
//   }


// REDUCER
export default function reducer(state = {}, action) {
    switch (action.type) {
    //   case LOGIN_USER: {
    //     return {
    //       ...state,
    //       token: action.token,
    //     }
    //   }
      default: return state;
    }
}
