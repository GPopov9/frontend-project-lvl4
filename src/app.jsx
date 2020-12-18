import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import UserContext from './userContext.js';
import rootReducer, { actions } from './slices/index.js';
import App from './components/App.jsx';
import resources from './locales/resources';

export default (gon) => {
  const preloadedState = {
    channels: {
      items: gon.channels,
      activeChannelId: gon.currentChannelId,
    },
    messages: gon.messages,
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  const username = cookies.get('username') || faker.internet.userName();
  cookies.set('username', username);

  const socket = io({ transports: ['websocket'] });

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addMessage(attributes));
  });

  socket.on('newChannel', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addChannel(attributes));
  });

  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannel(data));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannel(data));
  });

  render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
