import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const addChannelAsync = createAsyncThunk(
  'channels/addChannel',
  async ({ name, removable }) => {
    const data = { attributes: { name, removable } };
    const url = routes.channelsPath();
    await axios.post(url, { data });
  },
);

const renameChannelAsync = createAsyncThunk(
  'channels/renameChannel',
  async ({ name, id }) => {
    const data = { attributes: { name } };
    const url = routes.channelPath(id);
    await axios.patch(url, { data });
  },
);

const removeChannelAsync = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const url = routes.channelPath(id);
    await axios.delete(url);
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    activeChannelId: null,
  },
  reducers: {
    /* eslint-disable no-param-reassign */
    addChannel: (state, { payload }) => {
      state.items.push(payload);
      state.activeChannelId = payload.id;
    },

    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload;
    },

    renameChannel: (state, { payload: { id, attributes } }) => {
      const channel = state.items.find((item) => item.id === id);
      channel.name = attributes.name;
    },

    removeChannel: (state, { payload: { id } }) => {
      state.items = state.items.filter((item) => item.id !== id);
      state.activeChannelId = state.items[0].id;
    },
  },
  extraReducers: {
    [addChannelAsync.rejected]: () => { throw new Error(); },
    [renameChannelAsync.rejected]: () => { throw new Error(); },
    [removeChannelAsync.rejected]: () => { throw new Error(); },
  },
});

/* eslint-enable no-param-reassign */

const { actions } = channelsSlice;
export {
  actions,
  addChannelAsync,
  renameChannelAsync,
  removeChannelAsync,
};
export default channelsSlice.reducer;
