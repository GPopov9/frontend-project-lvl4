import React, { useState } from 'react';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Modals from './modals/index.js';



const renderModal = (modalInfo, handleClose) => {
  if (!modalInfo.type) {
    return null;
  }
  const Item = Modals(modalInfo.type);
  return <Item modalInfo={modalInfo} handleClose={handleClose} />
}

const App = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null});
  const handleShow = (type, channel = null) => setModalInfo({ type, channel });
  const handleClose = () => setModalInfo({ type: null, channel: null });

  const addChannelModal = () => handleShow('add');
  const renameChannelModal = (id, name) => handleShow('rename', { id, name });

  return (
    <div className="row h-100 pb-3">
      <Channels addChannelModal={addChannelModal} renameChannelModal={renameChannelModal} />
      <Messages />
      {renderModal(modalInfo, handleClose)}
    </div>
  );
};

export default App;
