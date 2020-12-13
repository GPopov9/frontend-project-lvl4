import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import routes from '../../routes';

const RemoveChannelModal = ({ handleClose, modalInfo }) => {
  const url = routes.channelPath(modalInfo.channel.id);

  const { t } = useTranslation();

  const removeChannel = async (_values, actions) => {
    try {
      await axios.delete(url);
      actions.setSubmitting(false);
      handleClose();
    } catch (err) {
      actions.setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      id: modalInfo.channel.id,
    },
    onSubmit: removeChannel,
  });

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Form.Group>
            {formik.status && <div className="text-danger">{formik.status}</div>}
            <Button className="mr-1" variant="primary" type="submit" disabled={formik.isSubmitting}>{t('buttons.remove')}</Button>
            <Button variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
