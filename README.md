# instantelegram
*[instantelegram](https://instantelegram-aa.herokuapp.com/) by Monia Techini, Sean McLaughlan, Seamus Le, and Riki Kaneshiro*

**Table of Contents**
* [Instantelegram at a Glance](#instantelegram-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Next Steps](#ideas-for-further-development)

## Instantelegram at a Glance
Instantelegram is a social image sharing web application. Instantelegram brings people together. It allows users to upload media, follow and unfollow other users. Users can browse, like and comment other users' content!

![](/documentation/images/instag1.PNG)

Instantelegram uses Cloudinary's Rest API to store images, and stores url references to those images in a postgres database.

## Application Architecture
Instantelegram's stack includes [React](https://reactjs.org/), [Redux](https://redux.js.org/), [Node](https://nodejs.org/en/), [Flask](https://flask.palletsprojects.com/en/1.1.x/), and [PostgreSQL](https://www.postgresql.org/). Most of the application's logic happens on the front end, using Redux actions to make fetch calls to the backend, and to [Cloudinary's](https://cloudinary.com/documentation) Rest API to upload images.

The backend serves the frontend and simply fetches data from the postgres database.

## Frontend Overview
Instantelegram is a fronend-leaning application, with most of the complexity coming from Redux and its interaction with the server and Cloudinary's Rest API. Below are the frontend technologies used with some notes regarding their implementation.

### Frontend Technologies Used
#### React
Instantelegram is a [React](https://reactjs.org/) application, and takes advantage of the modular nature of components to dynamically display many posts on a page at once. Using a React to develop Instantelegram as a single-page web application is what allows it to have such a snappy user experience.

#### Redux
[Redux](https://redux.js.org/) is the library which Instantelegram uses to manage state. Using Redux actions, Instantelegram makes calls to both the server and Cloudinary's Rest API.

Posts are fetched and stored in the Redux store whenever the user navigates to a different view. This makes the data for each post immediately available to be displayed.

When an post is uploaded, an action is called which takes the post's image and uploads it to Cloudninary using its Rest API. Once the image has been successfully uploaded, Cloudninary sends back a url which can be used to display the image. It is this url, along with the posts caption, that is sent to the server to be stored in the postgres database.

#### Cloudinary Rest API
Instantelegram takes advantage of [Cloudinary's](https://cloudinary.com/documentation) Rest API to store images on Cloudinary's database, and in turn storing url references to those files in a postgres database. Doing this frees up space on the postgres database and addresses some scaling concerns, as Cloudinary is able to handle a very large volume of requests.

#### Material-UI
Many of the components in Instantelegram are refactored components from the [Material-UI](https://material-ui.com/) framework. The uniform styling and flexibility of Material-UI's components made this an easy choice.

## Backend Overview
Instantelegram's backend is a Flask server which uses SQLAlchemy to access and update a postgres database. Below are the backend technologies that make this application possible.

### Backend Technologies Used
#### Flask
Using [Flask](https://flask.palletsprojects.com/en/1.1.x/) allowed quick development of the server with its easy to understand syntax. Flask's blueprints are used to separate different categories of endpoints on the server. Making a jwt token validator was very easy with Python's function decorators.

#### PostgreSQL
Relakqs uses a [PostgreSQL](https://www.postgresql.org/) database, and uses the ORM [SQLAlchemy](https://www.sqlalchemy.org/) to access and update it. Using table relationships with postgres was crucial in querying the database, and made [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) operations easy to implement.

## Ideas for Further Development
Some ideas for future development of Instantelegram include messaging to allow for more user interaction, and 'stories' to make for more ephemeral posts.
