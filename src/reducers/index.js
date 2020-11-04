import { combineReducers } from 'redux';

import channels, {
  actions as channelsActions,
  addChannelAsync,
  renameChannelAsync,
  removeChannelAsync,
} from './channels.js';

import messages, { actions as messagesActions, addMessageAsync } from './messages.js';

export default combineReducers({
  messages,
  channels,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
};

export {
  actions,
  addMessageAsync,
  addChannelAsync,
  renameChannelAsync,
  removeChannelAsync,
};
