# Endpoints

## Front Endpoints

- "/"
  - Splash or Sign in page
- "/" (Once logged in)
  - Shows feed of recent images
- "/login"
  - Session Form
- "/register"
  - Registration Form
- "/profile/:userId"
  - Profile Page


## API Endpoints

- Users
  - POST /users
    - add user to users table
  - POST /users/:userid/follow
    - add user to following table
    - the (:id) in this case is the person being followed
  - DELETE /users/:userid/follow
    - removes entry from following table
    - the (:id) in this case is the person being unfollowed
  - GET /users/:userid
    - return specific user from users table
    - return all of a specific users photos
    - return all of the follower/following data
  - PUT /users/:userid
    - update specific user from users table
  - DELETE /users/:userid
    - delete specific user from users table
    - also deletes a users photos
- Session
  - POST /session
  - DELETE /session
- Posts
  - GET /posts/
    - return posts of users that the current user follows
    - also returns comments and likes
  - POST /posts
    - add post to posts table
  - GET /posts/:postid
    - return specific post from posts table
    - also returns comments and likes
  - PUT /posts/:postid
    - update specific post from posts table
  - DELETE /posts/:postid
    - delete specific post from posts table
- Likes
  - POST /post/:postid/likes
    - Add a like to post
  - DELETE /post/:postid/likes
    - Remove a like from post
  - POST /comments/:commentId/likes
    - Add a like to comment
  - DELETE /comments/:commentId/likes
    - Remove a like from comment
- Comments
  - GET /posts/:postid/comments
    - return comments tied to a specific post
  - POST /posts/:postid/comments
    - add comment to comments table based on current post
  - DELETE /comments/:commentid
    - delete specific comment from comments table
  - PUT /comments/:commentid
    - edit a specific comment from comments table
- Stretch Goals
  - GET /search/:hashtag
      - returns posts whose caption contains the searched hashtag
