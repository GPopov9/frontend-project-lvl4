import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';

const modals = {
  add: Add,
  rename: Rename,
  remove: Remove,
};

export default (action) => modals[action];
