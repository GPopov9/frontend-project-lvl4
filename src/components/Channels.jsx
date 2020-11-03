import React from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Modal, Button, Form, DropdownButton, Dropdown, SplitButton, ButtonGroup } from 'react-bootstrap';
import { actions } from '../reducers/channels';

const renderChannel = ({ channel: { id, name, removable}, activeChannel, makeChannelActive, handleRename}) => {

  const variant = (id === activeChannel.id) ? 'primary' : 'light';



  return (
    <li key={id} className="nav-item">
    {removable
    ? (
        <Dropdown as={ButtonGroup} className="btn-block mb-2" onClick={() => makeChannelActive(id)}>
          <Button variant={variant} className="w-100">{`# ${name}`}</Button>
          <Dropdown.Toggle split variant={variant} id="dropdown-custom-2" />
          <Dropdown.Menu>
            <Dropdown.Item onSelect={handleRename}>Rename</Dropdown.Item>
            <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    )
    : (
      <Button variant={variant} className="mb-2 btn-block" onClick={() => makeChannelActive(id)}>{`# ${name}`}</Button>
    )
    }
    </li>
  )
}

const Channels = ({ addChannelModal, renameChannelModal }) => {
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const activeChannel = useSelector((state) => state.channels.items.find(({id}) => id === activeChannelId));
  const channels = useSelector((state) => state.channels.items);
  const dispatch = useDispatch();

  const handleRename = () => renameChannelModal(activeChannel.id, activeChannel.name);

  const makeChannelActive = (id) => dispatch(actions.setActiveChannel(id));


/*   const test = useStore();
  console.log(test.getState()); */

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={addChannelModal}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => renderChannel({channel, activeChannel, makeChannelActive, handleRename}))}
      </ul>

    </div>
  )
};

export default Channels;




//<ButtonGroup className="btn-block">
// <SplitButton variant={variant} /* className="mb-2 btn-block" */ title={`# ${name}`} onClick={() => makeChannelActive(id)} >
//  <Dropdown.Item eventKey="1">Remove</Dropdown.Item>
//  <Dropdown.Item eventKey="2">Rename</Dropdown.Item>
//</SplitButton>
// </ButtonGroup>