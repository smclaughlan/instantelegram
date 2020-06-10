import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';

const preloadedState = {
    user: {
        token: localStorage.getItem('x-access-token'),
        currentUserId: localStorage.getItem('currentUserId'),
    },
    image: {
        previewImgUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1591723161/Instantelegram/Screen_Shot_2020-06-09_at_10.14.56_AM_jkxk7w.png"
    }
}

const store = configureStore(preloadedState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
