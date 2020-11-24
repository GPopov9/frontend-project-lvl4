import AddChannelModal from './AddChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const modals = {
  add: AddChannelModal,
  rename: RenameChannelModal,
  remove: RemoveChannelModal,
};

export default (action) => modals[action];
