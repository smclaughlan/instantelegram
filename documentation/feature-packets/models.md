# Models

## Model List

- Users
- Follows
- Posts
- Comments
- Post Likes
- Comment Likes

### Users

| column          | type    | max length | default | constraints      |
| --------------- | ------- | ---------- | ------- | ---------------- |
| userName        | varchar | 20         | no      | not null, unique |
| hashed_password | binary  | none       | no      | not null         |
| email           | varchar | 50         | no      | not null, unique |
| bio             | varchar | 100        | ""      | not null         |

### Follows

| column      | type    | max length | default | constraints                     |
| ----------- | ------- | ---------- | ------- | ------------------------------- |
| followed_id | integer | none       | no      | not null references: (Users.Id) |
| follower_id | integer | none       | no      | not null references: (Users.Id) |

### Posts

| column | type    | max length | default | constraints                      |
| ------ | ------- | ---------- | ------- | -------------------------------- |
| image  | text    | none       | no      | not null                         |
| capt   | text    | none       | ""      | not null                         |
| userId | integer | none       | no      | not null, references: (Users.Id) |

### Comments

| column | type    | max length | default | constraints                      |
| ------ | ------- | ---------- | ------- | -------------------------------- |
| postId | integer | none       | no      | not null, references: (Posts.Id) |
| userId | integer | none       | no      | not null, references: (Users.Id) |
| body   | text    | none       | no      | not null                         |

### Post Likes

| column | type    | max length | default | constraints                     |
| ------ | ------- | ---------- | ------- | ------------------------------- |
| userId | integer | none       | no      | not null references: (Users.Id) |
| postId | integer | none       | no      | not null references: (Posts.Id) |

### Comment Likes

| column    | type    | max length | default | constraints                        |
| --------- | ------- | ---------- | ------- | ---------------------------------- |
| userId    | integer | none       | no      | not null references: (Users.Id)    |
| commentId | integer | none       | no      | not null references: (Comments.Id) |
