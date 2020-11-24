import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../routes';
import { selectChannelNames } from '../../utils/selectors';

const RenameChannelModal = ({ handleClose, modalInfo }) => {
  const url = routes.channelPath(modalInfo.channel.id);
  const channelsNames = useSelector(selectChannelNames);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const renameChannel = async (values, actions) => {
    const data = {
      attributes: {
        name: values.name,
      },
    };

    try {
      await axios.patch(url, { data });
      actions.setSubmitting(false);
      handleClose();
    } catch (err) {
      actions.setStatus('There is a network error. Please, try again.');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: modalInfo.channel.name,
    },
    onSubmit: renameChannel,
    validationSchema: yup.object().shape({
      name: yup.string().required().notOneOf(channelsNames),
    }),
    validateOnMount: true,
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
          {formik.status && (<div className="text-danger">{formik.status}</div>)}
          <Button variant="primary" className="mr-1" type="submit" disabled={formik.isSubmitting || formik.errors.name}>Rename</Button>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
