import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './lib/store.js';
import getUsername from './lib/username.js';
import UserContext from './lib/userContext.js';
import { actions } from './reducers/index.js';
import socket from './lib/socket.js';
import App from './components/App.jsx';

export default (gon) => {
  store.dispatch(actions.addChannels(gon.channels));
  store.dispatch(actions.setActiveChannel(gon.currentChannelId));
  store.dispatch(actions.addMessages(gon.messages));

  const username = getUsername();

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

  render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
