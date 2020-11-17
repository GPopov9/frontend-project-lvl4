import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import { addChannelAsync } from '../../reducers/index.js';

export default ({ handleClose }) => {
  const dispatch = useDispatch();

  const addNewChannel = async (values, actions) => {
    const data = {
      name: values.name,
      removable: true,
    };

    try {
      await dispatch(addChannelAsync(data));
      console.log(data);
      actions.setSubmitting(false);
      handleClose();
    } catch (err) {
      actions.setStatus('There is a network error. Please, try again.');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: addNewChannel,
    onReset: handleClose,
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <Form.Label>Channel Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
              disabled={formik.isSubmitting}
            />
          </Form.Group>
          <h6 className="text-danger">{formik.status}</h6>
          <Button className="mr-1" variant="primary" type="submit" disabled={formik.isSubmitting}>Add</Button>
          <Button variant="secondary" type="reset" disabled={formik.isSubmitting}>Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
