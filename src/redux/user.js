import { apiBaseUrl } from "../config";

// ACTIONS
const LOGIN_USER = "instantelegram/login/LOGIN_USER";
const LOGOUT_USER = "instantelegram/logout/LOGOUT_USER";
const USER_PROFILE = "instantelegram/profile/USER_PROFILE";
const FOLLOW = "instantelegram/profile/FOLLOW";
const UNFOLLOW = "instantelegram/profile/UNFOLLOW";
const UPDATE_FOLLOW = "instantelegram/profile/UPDATE_FOLLOW";
const UPDATE_CAPTION = "instantelegram/image/UPDATE_CAPTION";
const FEED_POSTS = "instantelegram/feed/FEED_POSTS";
const UPDATE_LIKE = "instantelegram/like/UPDATE_LIKE";
const GET_FOLLOWINGS = "instantelegram/profile/GET_FOLLOWINGS";
const UPDATE_COMMENT = "instantelegram/comment/UPDATE_COMMENT";
const DEL_POST = "instantelegram/image/DEL_POST";
const DELETE_COMMENT = "instantelegram/image/DELETE_COMMENT";
const ERROR_MESSAGE = "instantelegram/ERROR_MESSAGE";
const UPDATE_AVATAR = "instantelegram/profile/UPDATE_AVATAR";
const UPDATE_BIO = "instantelegram/profile/UPDATE_BIO";
const SET_UPDATE_PROFILE = "instantelegram/profile/SET_UPDATE_PROFILE";
const SET_UPDATED_COMMENT = "instantelegram/profile/SET_UPDATED_COMMENT";

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
export const awaitFollowUpdate = (val) => ({
  type: UPDATE_FOLLOW,
  val,
});

export const sendUserFollowReq = (userId, followedId) => ({
  type: FOLLOW,
  userId,
  followedId,
});
export const sendUserUnfollowReq = (userId, followedId) => ({
  type: UNFOLLOW,
  userId,
  followedId,
});
export const getFeedPost = (postsArr) => ({ type: FEED_POSTS, postsArr });
export const setFollowings = (followingsArr) => ({
  type: GET_FOLLOWINGS,
  followingsArr,
});
export const updateCaption = (updatedCaption, imgId) => ({
  type: UPDATE_CAPTION,
  updatedCaption,
  imgId,
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
export const setUpdatedBio = (updatedBio) => ({
  type: UPDATE_BIO,
  updatedBio,
});
export const setUpdatedAvatar = (updatedAvatarURL) => ({
  type: UPDATE_AVATAR,
  updatedAvatarURL,
});
export const setIsEditingProfile = (boolean) => ({
  type: SET_UPDATE_PROFILE,
  isEditingProfile: boolean,
});
export const setUpdatedComment = (commentId, updatedBody, postId) => ({
  type: SET_UPDATED_COMMENT,
  commentId,
  updatedBody,
  postId,
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
    // Stores token, currentUserId in localStorage
    window.localStorage.setItem("x-access-token", token);
    window.localStorage.setItem("currentUserId", currentUserId.toString());
    dispatch(loginUser(token, currentUserId.toString()));
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
    alert(err);
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

    /* Loop through each post's comments */
    Object.keys(comments).forEach((commentKey) => {
      let postWithComment = comments[commentKey];
      /* Loop through comments and change commenterId */
      Object.keys(postWithComment).forEach((postKey) => {
        postWithComment[postKey].commenterId =
          postWithComment[postKey].commenterId.toString();
      });
    });

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
    let postsArr = [];

    for (const post in posts) {
      const postObj = posts[post];
      const postId = post;
      const { user_id, ...postData } = postObj;

      const postUserRes = await fetch(`${apiBaseUrl}/users/${user_id}`);

      if (postUserRes.ok) {
        const postUserData = await postUserRes.json();
        const { avatarUrl, username } = postUserData;

        postData.avatarUrl = avatarUrl;
        postData.username = username;
        postData.postId = postId;
        postData.userId = user_id.toString();
      }
      postsArr.push(postData);
    }
    dispatch(getFeedPost(postsArr));
  }
};

//sends Get request to get all followings for the current user
export const getFollowings = (currentUserId) => async (dispatch) => {
  const followingsRes = await fetch(
    `${apiBaseUrl}/users/${currentUserId}/followings`
  );

  if (followingsRes.ok) {
    const followings = await followingsRes.json();

    let followingsArr = [];

    for (const key in followings) {
      const followingId = followings[key].followingId;
      followingsArr.push(followingId);
    }

    dispatch(setFollowings(followingsArr));
  }
};

//sends POST request to add a new following for the current user to the followedId
export const sendFollowReq = (userId, followedId) => async (dispatch) => {
  dispatch(awaitFollowUpdate(true));
  const res = await fetch(`${apiBaseUrl}/users/${followedId}/follow`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
    }),
  });
  if (res.ok) {
    dispatch(sendUserFollowReq(userId, followedId));
    dispatch(awaitFollowUpdate(false));
  }
};

//sends POST request to delete an existan following for the current user to the followedId
export const sendUnfollowReq = (userId, followedId) => async (dispatch) => {
  dispatch(awaitFollowUpdate(true));
  const res = await fetch(`${apiBaseUrl}/users/${followedId}/follow`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
    }),
  });
  if (res.ok) {
    dispatch(sendUserUnfollowReq(userId, followedId));
    dispatch(awaitFollowUpdate(false));
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
    const imgId = postObj.id.toString();
    delete postObj["id"];

    const { caption: updatedCaption } = postObj;

    dispatch(updateCaption(updatedCaption, imgId));

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
export const createComment =
  (postId, commentBody, token) => async (dispatch) => {
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
      Object.keys(commentObj).forEach(
        (commentObjKey) =>
          (commentObj[commentObjKey].commenterId =
            commentObj[commentObjKey].commenterId.toString())
      );
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

//sends a PUT request to update a comment for a particular post
export const editComment =
  (commentId, newBody, token, postId) => async (dispatch) => {
    try {
      const bodyToSend = JSON.stringify({ body: newBody });
      const res = await fetch(`${apiBaseUrl}/comments/${commentId}`, {
        method: "PUT",
        body: bodyToSend,
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw res;
      const commentObj = await res.json();
      const { id, body } = commentObj;
      dispatch(setUpdatedComment(id, body, postId));
    } catch (err) {
      console.error(err);
    }
  };

//sends DELETE request to delete a post
//checking the user authorization is done on the backend side
export const deletePostReq = (imageId, token) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/posts/${imageId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    dispatch(deletePost(imageId));
    // window.location.href = window.location.href;
    return;
  } catch (err) {
    console.error(err);
  }
};

//sends POST request so the current user updates his profile image
export const updateAvatar = (userId, newImg, token) => async (dispatch) => {
  try {
    const res = await fetch(`${apiBaseUrl}/users/${userId}`, {
      method: "PUT",
      body: newImg,
      headers: {
        "x-access-token": `${token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.message.split(":")[1]);
    }
    const avatarUrlRes = await res.json();
    alert("Successfully updated image.");
    dispatch(setIsEditingProfile(false));
    dispatch(setUpdatedAvatar(avatarUrlRes.avatarUrl));
  } catch (err) {
    console.error(err);
  }
};

//sends PUT request so the current user updates his bio
export const updateBioReq = (userId, bio, token) => async (dispatch) => {
  try {
    const body = JSON.stringify({ userId, bio, token });
    const res = await fetch(`${apiBaseUrl}/users/${userId}`, {
      method: "PUT",
      body,
      headers: {
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw res;
    const bioRes = await res.json();
    dispatch(setIsEditingProfile(false));
    dispatch(setUpdatedBio(bioRes.bio));
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
        id: action.id.toString(),
        username: action.username,
        bio: action.bio,
        avatarUrl: action.avatarUrl,
      };
      newState.posts = action.posts;
      newState.likes = action.likes;
      newState.comments = action.comments;
      return newState;
    }
    case FEED_POSTS: {
      const filteredPosts = state.feedPosts
        ? action.postsArr
            .filter((post) => {
              return !state.feedPosts.some(
                (existingPost) => existingPost.postId === post.postId
              );
            })
            .map((post) => {
              return post;
            })
        : action.postsArr;
      const existingPosts = state.feedPosts ? state.feedPosts : [];
      return {
        ...state,
        feedPosts: [...existingPosts, ...filteredPosts],
      };
    }
    case GET_FOLLOWINGS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          followings: action.followingsArr,
        },
      };
    }
    case FOLLOW: {
      return {
        ...state,
        profile: {
          ...state.profile,
          followings: [
            ...state.profile.followings,
            parseInt(action.followedId),
          ],
        },
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        profile: {
          ...state.profile,
          followings: state.profile.followings.filter(
            (followingId) => followingId !== action.followedId
          ),
        },
      };
    }
    case UPDATE_FOLLOW: {
      return {
        ...state,
        profile: {
          ...state.profile,
          updateFollowing: action.val,
        },
      };
    }
    case UPDATE_CAPTION: {
      const updatedFeedPostIdx = state.feedPosts.findIndex(
        (ele) => ele.postId === action.imgId
      );
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.imgId]: {
            ...state.posts[action.imgId],
            caption: action.updatedCaption,
          },
        },
        feedPosts: [
          ...state.feedPosts.slice(0, updatedFeedPostIdx),
          {
            ...state.feedPosts[updatedFeedPostIdx],
            caption: action.updatedCaption,
          },
          ...state.feedPosts.slice(updatedFeedPostIdx + 1),
        ],
      };
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
        feedPosts: state.feedPosts.filter(
          (post) => post.postId !== action.imageId
        ),
      };
    }
    case UPDATE_BIO: {
      return {
        ...state,
        profile: {
          ...state.profile,
          bio: action.updatedBio,
        },
      };
    }
    case UPDATE_AVATAR: {
      return {
        ...state,
        profile: {
          ...state.profile,
          avatarUrl: action.updatedAvatarURL,
        },
      };
    }
    case SET_UPDATE_PROFILE: {
      return {
        ...state,
        isEditingProfile: action.isEditingProfile,
      };
    }
    case SET_UPDATED_COMMENT: {
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.postId]: {
            ...state.comments[action.postId],
            [action.commentId]: {
              ...state.comments[action.postId][action.commentId],
              body: action.updatedBody,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}
