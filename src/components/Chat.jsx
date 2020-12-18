import React from 'react';

import MessagesInput from './MessagesInput.jsx';
import Messages from './Messages.jsx';

const Chat = () => (
  <div className="col-9 h-100">
    <div className="d-flex flex-column h-100">
      <Messages />
      <div className="mt-auto">
        <MessagesInput />
      </div>
    </div>
  </div>
);

export default Chat;
