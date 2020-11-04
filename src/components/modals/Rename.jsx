import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import { renameChannelAsync } from '../../reducers/index.js';

export default ({ modalInfo, handleClose }) => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const renameChannel = async (values, actions) => {
    const data = {
      name: values.name,
      id: modalInfo.channel.id,
    };

    try {
      await dispatch(renameChannelAsync(data));
      actions.setSubmitting(false);
      handleClose();
    } catch (err) {
      actions.setStatus('Network Error!');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: modalInfo.channel.name,
    },
    onSubmit: renameChannel,
    onReset: () => handleClose(),
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Channel Rename</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <Form.Label>New Channel Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
              disabled={formik.isSubmitting}
              ref={inputRef}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting}>Rename</Button>
          {' '}
          <Button variant="secondary" type="reset" disabled={formik.isSubmitting}>Cancel</Button>
          {' '}
        </Form>
      </Modal.Body>
    </Modal>
  );
};
