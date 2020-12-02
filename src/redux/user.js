import { apiBaseUrl } from "../config";

// ACTIONS
const LOGIN_USER = "instantelegram/login/LOGIN_USER";
const LOGOUT_USER = "instantelegram/logout/LOGOUT_USER";
const USER_PROFILE = "instantelegram/profile/USER_PROFILE";
const UPDATE_CAPTION = "instantelegram/image/UPDATE_CAPTION";
const FEED_POSTS = "instantelegram/feed/FEED_POSTS";
const FEED_ORDER = "instantelegram/feed/FEED_ORDER";
const UPDATE_LIKE = "instantelegram/like/UPDATE_LIKE";
const GET_FOLLOWERS = "instantelegram/profile/GET_FOLLOWERS";
const UPDATE_COMMENT = "instantelegram/comment/UPDATE_COMMENT";
const DEL_POST = "instantelegram/image/DEL_POST";
const DELETE_COMMENT = "instantelegram/image/DELETE_COMMENT";
const ERROR_MESSAGE = "instantelegram/ERROR_MESSAGE";

export const loginUser = (token, currentUserId) => ({
  type: LOGIN_USER,
  token,
  currentUserId,
});
export const logoutUser = () => ({ type: LOGOUT_USER });
export const getUserProfile = (
  id,
  username,
  bio,
  avatarUrl,
  posts,
  likes,
  comments
  ) => ({
  type: USER_PROFILE,
  id,
  username,
  bio,
  avatarUrl,
  posts,
  likes,
  comments,
});

export const getFeedPosts = (postsObj) => ({ type: FEED_POSTS, postsObj });

export const getFeedOrder = (postsOrd) => ({ type: FEED_ORDER, postsOrd});

export const setFollowers = (followersArr) => ({
  type: GET_FOLLOWERS,
  followersArr,
});

export const updateCaption = (postObj, imageId) => ({
  type: UPDATE_CAPTION,
  postObj,
  imageId,
});

export const updateLike = (imageId, likesArr) => ({
  type: UPDATE_LIKE,
  imageId,
  likesArr,
});

export const updateComment = (postId, commentObj) => ({
  type: UPDATE_COMMENT,
  postId,
  commentObj,
});

export const deleteCommentDis = (postId, commentObj) => ({
  type: DELETE_COMMENT,
  postId,
  commentObj,
});

export const deletePost = (imageId) => ({
  type: DEL_POST,
  imageId,
});

export const errorMessage = (messageType, message) => ({
  type: ERROR_MESSAGE,
  messageType,
  message,
});

// THUNKS
//sends register request to the backend with user info
export const sendRegisterReq = (userInfo) => async (dispatch) => {
  //makes a post request to create new user in the database
  const res = await fetch(`${apiBaseUrl}/session/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userInfo.username,
      email: userInfo.email,
      bio: userInfo.bio,
      hashed_password: userInfo.password,
    }),
  });

  if (res.status === 401) {
    const { error } = await res.json();
    const messageType = "register";
    dispatch(errorMessage(messageType, error));
  }
  if (res.ok) {
    // const { token, currentUserId } = await res.json();

    const test = await res.json();
    const { token, currentUserId } = test;
    console.log(test)
    // Stores token, currentUserId in localStorage
    window.localStorage.setItem("x-access-token", token);
    window.localStorage.setItem("currentUserId", currentUserId);
    dispatch(loginUser(token, currentUserId));
  }
};

//sends login request to the backend with user info: username and password
export const sendLoginReq = (userInfo) => async (dispatch) => {
  //makes a post request with user's info
  try {
    const res = await fetch(`${apiBaseUrl}/session/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
      }),
    });
    if (res.status === 401) {
      const { message } = await res.json();
      const messageType = "login";
      dispatch(errorMessage(messageType, message));
    }
    if (res.ok) {
      const { token, currentUserId } = await res.json();
      // Stores token, currentUserId in localStorage
      window.localStorage.setItem("x-access-token", token);
      window.localStorage.setItem("currentUserId", currentUserId.toString());
      dispatch(loginUser(token, currentUserId.toString()));
    }
  } catch (err) {
    console.log(err);
  }
};

//log out user by clearing the localStorage
export const sendLogoutReq = () => async (dispatch) => {
  window.localStorage.removeItem("x-access-token");
  window.localStorage.removeItem("currentUserId");
  dispatch(logoutUser());
};

//sends GET requests to get a user posts(with comments and likes) for the profile page
export const getUserProfileReq = (id) => async (dispatch) => {
  const res = await fetch(`${apiBaseUrl}/users/${id}`);
  const res2 = await fetch(`${apiBaseUrl}/posts/${id}`);
  const res3 = await fetch(`${apiBaseUrl}/likes/`);
  const res4 = await fetch(`${apiBaseUrl}/comments/`);
  if (res.ok && res2.ok && res3.ok && res4.ok) {
    const resJson = await res.json();
    const posts = await res2.json();
    const likes = await res3.json();
    const comments = await res4.json();
    const username = resJson.username;
    const bio = resJson.bio;
    const avatarUrl = resJson.avatarUrl;

    dispatch(
      getUserProfile(id, username, bio, avatarUrl, posts, likes, comments)
    );
  }
};

//sends GET request to get all posts for all the followings for the current user
//and display it on the feed page, including the current user posts
export const getFeedPostReq = (currentUserId) => async (dispatch) => {
  const postsRes = await fetch(`${apiBaseUrl}/users/${currentUserId}/posts`);

  if (postsRes.ok) {
    const posts = await postsRes.json();
    const postsOrd = [];

    for (const postId in posts) {
      postsOrd.push({'timestamp': posts[postId].timestamp, postId});
    }
    postsOrd.sort((a, b) => {
      return Date.parse(b.timestamp) - Date.parse(a.timestamp);
    });
    dispatch(getFeedOrder(postsOrd));
    dispatch(getFeedPosts(posts));
  }
};

//sends Get request to get all followers for a user
export const getFollowers = (currentUserId) => async (dispatch) => {
  const followingsRes = await fetch(
    `${apiBaseUrl}/users/${currentUserId}/followings`
  );

  if (followingsRes.ok) {
    const {ids} = await followingsRes.json();
    dispatch(setFollowers(ids));
  }
};

//sends POST request to add a new following for the current user to the followedId
export const sendFollowReq = (userId, followedId) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/users/${followedId}/follow`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (!res.ok) throw res;
    const {ids} = await res.json()
    dispatch(setFollowers(ids));
  } catch (err) {
    console.error(err)
  }
};

//sends POST request to delete an existan following for the current user to the followedId
export const sendUnfollowReq = (userId, followedId) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/users/${followedId}/follow`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (!res.ok) throw res;
    const {ids} = await res.json()
    dispatch(setFollowers(ids));

  } catch (err) {
    console.error(err)
  }
};

//sends a PUT request to update a post caption
//checking the user authorization is done on the backend side
export const updateCapt = (caption, imageId, token) => async (dispatch) => {
  try {
    const body = JSON.stringify({ caption, token });
    const res = await fetch(`${apiBaseUrl}/posts/${imageId}`, {
      method: "PUT",
      body,
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    const postObj = await res.json();
    const imgId = postObj.id;
    delete postObj["id"];

    dispatch(updateCaption(postObj, imgId));

    return;
  } catch (err) {
    console.error(err);
  }
};

//sends POST request to add a like to a particular post
export const createLike = (imageId, token) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/posts/${imageId}/likes`, {
      method: "POST",
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    const data = await res.json();
    const likesArr = data.data;
    dispatch(updateLike(imageId, likesArr));
    return;
  } catch (err) {
    console.error(err);
  }
};

//sends DELETE request to delete a like for a particular post
export const deleteLike = (imageId, token) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/posts/${imageId}/likes`, {
      method: "DELETE",
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    const data = await res.json();
    const likesArr = data.data;
    dispatch(updateLike(imageId, likesArr));
    return;
  } catch (err) {
    console.error(err);
  }
};

//sends POST request to create a new comment for a particular post
export const createComment = (postId, commentBody, token) => async (
  dispatch
) => {
  try {
    const body = JSON.stringify({ commentBody });
    const res = await fetch(`${apiBaseUrl}/comments/${postId}`, {
      method: "POST",
      body,
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    const commentObj = await res.json();
    dispatch(updateComment(postId, commentObj));
  } catch (err) {
    console.error(err);
  }
};

//sends a DELETE request to delete a comment for a particular post
export const deleteComment = (commentId, postId, token) => async (dispatch) => {
  try {
    const body = JSON.stringify({ postId });
    const res = await fetch(`${apiBaseUrl}/comments/${commentId}`, {
      method: "DELETE",
      body,
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    const commentObj = await res.json();
    dispatch(deleteCommentDis(postId, commentObj));
  } catch (err) {
    console.error(err);
  }
};

//sends DELETE request to delete a post
//checking the user authorization is done on the backend side
export const deletePostReq = (imageId, token, currentUserId) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/posts/${imageId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    dispatch(getFeedPostReq(currentUserId))

    return;
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER: {
      if (state) {
        delete state.error;
      }
      return {
        ...state,
        token: action.token,
        currentUserId: action.currentUserId,
      };
    }
    case LOGOUT_USER: {
      delete state.token;
      delete state.currentUserId;
      delete state.feedPosts;
      delete state.profile;
      delete state.posts;
      delete state.likes;
      delete state.comments;
      return {
        ...state,
      };
    }

    case ERROR_MESSAGE: {
      const newState = Object.assign({}, state);
      const { messageType, message } = action;
      newState["error"] = { [messageType]: message };
      return newState;
    }

    case USER_PROFILE: {
      const newState = Object.assign({}, state);
      newState.profile = {
        id: action.id,
        username: action.username,
        bio: action.bio,
        avatarUrl: action.avatarUrl,
        followers: newState.profile && newState.profile.followers ? newState.profile.followers : [],
      };
      newState.posts = action.posts;
      newState.likes = action.likes;
      newState.comments = action.comments;
      return newState;
    }
    case FEED_POSTS: {
      const newState = Object.assign({}, state)
      return Object.assign(
        newState,
        {
          feedPosts: action.postsObj,
        }
      )
    }
    case FEED_ORDER: {
      const newState = Object.assign({}, state)
      return Object.assign(
        newState,
        {
          feedPostsOrd: action.postsOrd,
        }
      )
    }
    case GET_FOLLOWERS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: action.followersArr,
        },
      };
    }

    case UPDATE_CAPTION: {
      const newState = Object.assign({}, state);
      newState.posts[action.imageId] = action.postObj;
      return newState;
    }

    case UPDATE_LIKE: {
      const newState = Object.assign({}, state);
      newState.likes[action.imageId] = action.likesArr;
      return newState;
    }

    case UPDATE_COMMENT: {
      const newState = Object.assign({}, state);
      newState.comments[action.postId] = action.commentObj;
      return newState;
    }

    case DELETE_COMMENT: {
      const newState = Object.assign({}, state);
      newState.comments[action.postId] = action.commentObj;
      return newState;
    }

    case DEL_POST: {
      delete state.posts[action.imageId];
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
