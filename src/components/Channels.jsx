import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channel from './Channel';
import { actions } from '../slices/channels';
import { selectActiveChannel, selectChannels, selectActiveChannelId } from '../selectors';
import Plus from '../../assets/plus.svg';

const Channels = ({ addChannelModal, renameChannelModal, removeChannelModal }) => {
  const activeChannel = useSelector(selectActiveChannel);
  const activeChannelId = useSelector(selectActiveChannelId);
  const channels = useSelector(selectChannels);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleRename = () => renameChannelModal(activeChannel.id, activeChannel.name);
  const handleRemove = () => removeChannelModal(activeChannel.id);
  const makeChannelActive = (id) => dispatch(actions.setActiveChannel(id));

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('titles.channels')}</span>
        <button type="button" className="ml-auto p-0 btn btn-lg" onClick={addChannelModal}>
          <Plus />
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {
          channels.map((channel) => (
            <Channel
              key={channel.id}
              channel={channel}
              activeChannelId={activeChannelId}
              makeChannelActive={makeChannelActive}
              handleRename={handleRename}
              handleRemove={handleRemove}
            />
          ))
        }
      </ul>
    </div>
  );
};

export default Channels;
