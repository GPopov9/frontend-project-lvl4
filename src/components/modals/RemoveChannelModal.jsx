import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import axios from 'axios';
import routes from '../../routes';

const RemoveChannelModal = ({ handleClose, modalInfo }) => {
  const url = routes.channelPath(modalInfo.channel.id);

  const removeChannel = async (values, actions) => {
    try {
      await axios.delete(url);
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

export default RemoveChannelModal;
