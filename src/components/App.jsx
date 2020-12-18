import React, { useState } from 'react';

import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import Modals from './modals/index.js';

const renderModal = (handleClose, modalInfo) => {
  if (!modalInfo.type) {
    return null;
  }
  const Modal = Modals(modalInfo.type);
  return <Modal handleClose={handleClose} modalInfo={modalInfo} />;
};

const App = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const handleClose = () => setModalInfo({ type: null, channel: null });

  const addChannelModal = () => setModalInfo({ type: 'add', channel: null });
  const renameChannelModal = (id, name) => setModalInfo({ type: 'rename', channel: { id, name } });
  const removeChannelModal = (id) => setModalInfo({ type: 'remove', channel: { id } });

  return (
    <div className="row h-100 pb-3">
      <Channels
        addChannelModal={addChannelModal}
        renameChannelModal={renameChannelModal}
        removeChannelModal={removeChannelModal}
      />
      <Chat />
      {renderModal(handleClose, modalInfo)}
    </div>
  );
};

export default App;
