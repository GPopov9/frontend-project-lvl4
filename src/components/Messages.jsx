import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectMessages } from '../selectors';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

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
    <div id="messages-box" className="chat-messages overflow-auto mb-3 text-break">
      {messages.map(renderMessage)}
      <AlwaysScrollToBottom />
    </div>
  );
};

export default Messages;
