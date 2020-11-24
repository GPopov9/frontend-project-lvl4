import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import setUsername from './utils/username.js';
import UserContext from './utils/userContext.js';
import rootReducer, { actions } from './slices/index.js';
import socket from './utils/socket.js';
import App from './components/App.jsx';

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

  const username = setUsername();

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
