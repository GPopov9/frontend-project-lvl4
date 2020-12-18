import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

const Channel = ({
  channel: { id, name, removable }, activeChannelId, makeChannelActive, handleRename, handleRemove,
}) => {
  const variant = (id === activeChannelId) ? 'primary' : 'light';

  return (
    <li key={id} className="nav-item">
      {removable
        ? (
          <Dropdown as={ButtonGroup} className="btn-block mb-2" onClick={() => makeChannelActive(id)}>
            <Button variant={variant} className="w-100">{`# ${name}`}</Button>
            <Dropdown.Toggle split variant={variant} id="dropdown-custom-2" />
            <Dropdown.Menu>
              <Dropdown.Item onSelect={handleRename}>Rename</Dropdown.Item>
              <Dropdown.Item onSelect={handleRemove}>Remove</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <Button variant={variant} className="mb-2 btn-block" onClick={() => makeChannelActive(id)}>{`# ${name}`}</Button>
        )}
    </li>
  );
};

export default Channel;
