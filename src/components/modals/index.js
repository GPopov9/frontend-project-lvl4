import Add from './Add.jsx';
import Rename from './Rename.jsx';


const modals =  {
  'add': Add,
  'rename': Rename,
}

export default (action) => modals[action];