import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import UserContext from '../utils/userContext.js';

const MessagesInput = () => {
  const username = useContext(UserContext);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const url = routes.channelMessagesPath(activeChannelId);

  const handleSubmit = async (values, actions) => {
    const data = {
      attributes: {
        username,
        message: values.message,
      },
    };

    try {
      await axios.post(url, { data });
      actions.resetForm();
    } catch (err) {
      actions.setStatus('There is a network error. Please, try again.');
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmit,
    validationSchema: yup.object().shape({
      message: yup.string().required(),
    }),
    validateOnMount: true,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Col sm={11}>
          <Form.Control
            name="message"
            type="text"
            placeholder="Message..."
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
          />
        </Col>
        <Col sm={1}>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting || formik.errors.message}>Send</Button>
        </Col>
      </Form.Row>
      <Form.Control.Feedback type="invalid" className="d-block">
        {formik.status}
      </Form.Control.Feedback>
    </Form>
  );
};

export default MessagesInput;
