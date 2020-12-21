import React, { useEffect, useRef } from 'react';

const Message = ({ id, username, message }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollIntoView();
  });

  return (
    <div key={id} ref={messageRef}>
      <b>{username}</b>
      :
      {message}
    </div>
  );
};

export default Message;
