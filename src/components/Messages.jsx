import React from 'react';
import { useSelector } from 'react-redux';
import MessagesInput from './MessagesInput.jsx';
import { selectMessages } from '../utils/selectors';

const renderMessage = (data) => {
  const { id, username, message } = data;
  return (
    <div key={id}>
      <b>{username}</b>
      :
      {message}
    </div>
  );
};

const Messages = () => {
  const messages = useSelector(selectMessages);
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.map((message) => renderMessage(message))}
        </div>
        <div className="mt-auto">
          <MessagesInput />
        </div>
      </div>

    </div>
  );
};

export default Messages;
