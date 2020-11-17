import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import { removeChannelAsync } from '../../reducers/index.js';

export default ({ handleClose, modalInfo }) => {
  const dispatch = useDispatch();

  const removeChannel = async (values, actions) => {
    try {
      await dispatch(removeChannelAsync(values.id));
      actions.setSubmitting(false);
      handleClose();
    } catch (err) {
      actions.setStatus('There is a network error. Please, try again.');
    }
  };

  const formik = useFormik({
    initialValues: {
      id: modalInfo.channel.id,
    },
    onSubmit: removeChannel,
    onReset: handleClose,
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Do you confirm channel removal?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <h6 className="text-danger">{formik.status}</h6>
            <Button className="mr-1" variant="primary" type="submit" disabled={formik.isSubmitting}>Remove</Button>
            <Button variant="secondary" type="reset" disabled={formik.isSubmitting}>Cancel</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
