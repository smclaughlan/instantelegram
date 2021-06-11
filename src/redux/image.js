import { push } from "connected-react-router";
const { apiBaseUrl } = require("../config");

// ACTIONS

// THUNKS

//sends POST request to create a new post with image and caption
//current user will be the owner/poster
export const post = (postFormData, token) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/posts/`, {
      method: "POST",
      body: postFormData,
      headers: {
        "x-access-token": `${token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.message.split(":")[1]);
    } else {
      dispatch(push("/"));
    }
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
export default function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
