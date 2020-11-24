import { combineReducers } from 'redux';
import channels, { actions as channelsActions } from './channels.js';
import messages, { actions as messagesActions } from './messages.js';

export default combineReducers({
  messages,
  channels,
});

export const actions = {
  ...channelsActions,
  ...messagesActions,
};
