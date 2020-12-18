import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channel from './Channel';
import { actions } from '../slices/channels';
import { selectActiveChannel, selectChannels, selectActiveChannelId } from '../selectors';

const Channels = ({ addChannelModal, renameChannelModal, removeChannelModal }) => {
  const activeChannel = useSelector(selectActiveChannel);
  const activeChannelId = useSelector(selectActiveChannelId);
  const channels = useSelector(selectChannels);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleRename = () => renameChannelModal(activeChannel.id, activeChannel.name);
  const handleRemove = () => removeChannelModal(activeChannel.id);
  const makeChannelActive = (id) => dispatch(actions.setActiveChannel(id));

  /* eslint-disable react/jsx-wrap-multilines */

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('titles.channels')}</span>
        <button type="button" className="ml-auto p-0 btn btn-lg" onClick={addChannelModal}>
          <span>
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="blue" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {
          channels.map((channel) => (
            <Channel
              channel={channel}
              activeChannelId={activeChannelId}
              makeChannelActive={makeChannelActive}
              handleRename={handleRename}
              handleRemove={handleRemove}
            />))
        }
      </ul>
    </div>
  );
};

/* eslint-enable react/jsx-wrap-multilines */

export default Channels;
