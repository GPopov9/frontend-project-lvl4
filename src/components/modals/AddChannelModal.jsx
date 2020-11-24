import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import routes from '../../routes';
import { selectChannelNames } from '../../utils/selectors';

const AddChannelModal = ({ handleClose }) => {
  const url = routes.channelsPath();
  const channelsNames = useSelector(selectChannelNames);

  const addNewChannel = async (values, actions) => {
    const data = {
      attributes: {
        name: values.name,
        removable: true,
      },
    };

    try {
      await axios.post(url, { data });
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
    validationSchema: yup.object().shape({
      name: yup.string().required().notOneOf(channelsNames),
    }),
    validateOnMount: true,
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
          {formik.status && <div className="text-danger">{formik.status}</div>}
          <Button className="mr-1" variant="primary" type="submit" disabled={formik.isSubmitting || formik.errors.name}>Add</Button>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
