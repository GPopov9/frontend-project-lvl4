import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const addMessageAsync = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, username, message }) => {
    const data = { attributes: { username, message } };
    const url = routes.channelMessagesPath(channelId);
    console.log(url);
    await axios.post(url, { data });
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload }) => {
      state.push(payload);
    },
    addMessages: (state, { payload }) => {
      state.push(...payload);
    },
  },

});

const { actions } = messagesSlice;
export { actions, addMessageAsync };
export default messagesSlice.reducer;
