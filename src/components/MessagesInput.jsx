import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

import { addMessageAsync } from '../reducers/index.js';

import UserContext from '../utils/userContext.js';

const MessagesInput = () => {
  const username = useContext(UserContext);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    if (values.message.length === 0) {
      return;
    }
    const data = {
      channelId: activeChannelId,
      username,
      message: values.message,
    };

    try {
      await dispatch(addMessageAsync(data));
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
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
        </Col>
        <Col sm={1}>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting || formik.values.message === ''}>Send</Button>
        </Col>
      </Form.Row>
      <Form.Control.Feedback type="invalid" className="d-block">
        {formik.status}
        &nbsp;
      </Form.Control.Feedback>
    </Form>
  );
};

export default MessagesInput;
