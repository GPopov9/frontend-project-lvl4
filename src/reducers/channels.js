import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const addChannelAsync = createAsyncThunk(
  'channels/addChannel',
  async({ name, removable }) => {
    const data = { attributes: { name, removable } };
    const url = routes.channelsPath();
    console.log(url);
    await axios.post(url, { data });
  }
)

const renameChannelAsync = createAsyncThunk(
  'channels/renameChannel',
  async({ name, id }) => {
    const data = { attributes: { name } };
    const url = routes.channelPath(id);
    console.log(url);
    await axios.patch(url, { data });
  }
)

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    activeChannelId: null,
  },
  reducers: {
    addChannels: (state, { payload }) => {
      state.items.push(...payload);
    },

    addChannel: (state, { payload }) => {
      state.items.push(payload);
      state.activeChannelId = payload.id;
    },

    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload;
    },

    renameChannel: (state, { payload: {id, attributes } }) => {
      const channel = state.items.find((item) => item.id === id);
      //console.log(payload);
      //console.log(data);
      channel.name = attributes.name;
    }
  }

});

const actions = channelsSlice.actions;
export { actions, addChannelAsync, renameChannelAsync };
export default channelsSlice.reducer;