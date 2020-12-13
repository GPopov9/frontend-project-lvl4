import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';

import routes from '../routes.js';
import UserContext from '../utils/userContext.js';
import { selectActiveChannelId } from '../utils/selectors';

const MessagesInput = () => {
  const username = useContext(UserContext);
  const activeChannelId = useSelector(selectActiveChannelId);
  const url = routes.channelMessagesPath(activeChannelId);

  const { t } = useTranslation();

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
    } catch (_err) {
      actions.setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmit,
    validationSchema: yup.object().shape({
      message: yup.string().trim().required(),
    }),
    isInitialValid: false,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Col xs={10}>
          <Form.Control
            name="message"
            type="text"
            placeholder={t('titles.placeholder')}
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
          />
        </Col>
        <Col xs={2}>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>{t('buttons.send')}</Button>
        </Col>
      </Form.Row>
      <Form.Control.Feedback type="invalid" className="d-block">
        {formik.status}
      </Form.Control.Feedback>
    </Form>
  );
};

export default MessagesInput;
