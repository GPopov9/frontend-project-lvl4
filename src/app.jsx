import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './utils/store.js';
import getUsername from './utils/username.js';
import UserContext from './utils/userContext.js';
import { actions } from './reducers/index.js';
import socket from './utils/socket.js';
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
