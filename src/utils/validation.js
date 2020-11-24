import * as yup from 'yup';

export const schemaMessage = yup.object().shape({
  message: yup.string().required(),
});

export const schemaChannel = yup.object().shape({
  name: yup.string().required(),
});
