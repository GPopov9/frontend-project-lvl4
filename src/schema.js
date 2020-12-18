import * as yup from 'yup';

export const schemaMessages = yup.string().trim().required();
export const schemaChannels = (channels, messageLong, messageDuplicate) => yup.string()
  .trim().required(' ').max(15, messageLong)
  .notOneOf(channels, messageDuplicate);
