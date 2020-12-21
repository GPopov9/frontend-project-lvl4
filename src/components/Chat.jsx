import React from 'react';
import { useSelector } from 'react-redux';

import MessagesInput from './MessagesInput.jsx';
import Message from './Message.jsx';
import { selectMessages } from '../selectors';

const Chat = () => {
  const messages = useSelector(selectMessages);
  return (
    <div className="col-9 h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3 text-break">
          {
          messages.map((m) => (
            <Message
              key={m.id}
              id={m.id}
              username={m.username}
              message={m.message}
            />
          ))
        }
        </div>
        <div className="mt-auto">
          <MessagesInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
