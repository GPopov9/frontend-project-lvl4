import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import routes from '../../routes';
import { selectChannelNames } from '../../utils/selectors';

const AddChannelModal = ({ handleClose }) => {
  const url = routes.channelsPath();
  const channelsNames = useSelector(selectChannelNames);

  const { t } = useTranslation();

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
      actions.setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: addNewChannel,
    validationSchema: yup.object().shape({
      name: yup.string().trim().required(' ').notOneOf(channelsNames, t('errors.duplicate')),
    }),
    validateOnMount: true,
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <Form.Label>{t('titles.channelName')}</Form.Label>
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
          {formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
          <Button className="mr-1" variant="primary" type="submit" disabled={formik.isSubmitting || formik.errors.name}>{t('buttons.add')}</Button>
          <Button variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
