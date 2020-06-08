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
  - POST /api/users
    - add user to users table
  - POST /api/users/:userid/follow
    - add user to following table
    - the (:id) in this case is the person being followed
  - DELETE /api/users/:userid/follow
    - removes entry from following table
    - the (:id) in this case is the person being unfollowed
  - GET /api/users/:userid
    - return specific user from users table
    - return all of a specific users photos
    - return all of the follower/following data
  - PUT /api/users/:userid
    - update specific user from users table
  - DELETE /api/users/:userid
    - delete specific user from users table
    - also deletes a users photos
- Session
  - POST /api/session
  - DELETE /api/session
- Posts
  - GET /api/posts/
    - return posts of users that the current user follows
    - also returns comments and likes
  - POST /api/posts
    - add post to posts table
  - GET /api/posts/:postid
    - return specific post from posts table
    - also returns comments and likes
  - PUT /api/posts/:postid
    - update specific post from posts table
  - DELETE /api/posts/:postid
    - delete specific post from posts table
- Likes
  - POST /api/post/:postid/likes
    - Add a like to post
  - DELETE /api/post/:postid/likes
    - Remove a like from post
  - POST /api/comments/:commentId/likes
    - Add a like to comment
  - DELETE /api/comments/:commentId/likes
    - Remove a like from comment
- Comments
  - GET /api/posts/:postid/comments
    - return comments tied to a specific post
  - POST /api/posts/:postid/comments
    - add comment to comments table based on current post
  - DELETE /api/comments/:commentid
    - delete specific comment from comments table
  - PUT /api/comments/:commentid
    - edit a specific comment from comments table
- Stretch Goals
  - GET /api/search/:hashtag
      - returns posts whose caption contains the searched hashtag
