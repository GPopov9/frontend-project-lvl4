import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import routes from '../../routes';
import { selectChannelNames } from '../../utils/selectors';

const RenameChannelModal = ({ handleClose, modalInfo }) => {
  const url = routes.channelPath(modalInfo.channel.id);
  const channelsNames = useSelector(selectChannelNames);

  const { t } = useTranslation();

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
    } catch (_err) {
      actions.setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: modalInfo.channel.name,
    },
    onSubmit: renameChannel,
    validationSchema: yup.object().shape({
      name: yup.string().trim().required(' ').notOneOf(channelsNames, t('errors.duplicate')),
    }),
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            <Form.Label>{t('titles.newChannelName')}</Form.Label>
            <Form.Control
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              ref={inputRef}
            />
          </Form.Group>
          {formik.status && <div className="text-danger">{formik.status}</div>}
          {formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
          <Button variant="primary" className="mr-1" type="submit" disabled={formik.isSubmitting || !formik.isValid}>{t('buttons.rename')}</Button>
          <Button variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
