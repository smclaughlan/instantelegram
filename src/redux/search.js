const { apiBaseUrl } = require("../config");

// ACTIONS
const GET_USER_IDS = "instantelegram/search/GET_USER_IDS";

const updateUserIds = (searchIdObj) => ({
  type: GET_USER_IDS,
  searchIdObj,
});

// THUNKS

export const getUserIds = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/search/`, {
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    const userIdsObj = await res.json()
    dispatch(updateUserIds(userIdsObj))
    return;
  } catch (err) {
    console.error(err);
  }
};


// REDUCER
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_IDS: {
      return {
        ...state,
        userIds: action.searchIdObj,
      };
    }
    default:
      return state;
  }
}
