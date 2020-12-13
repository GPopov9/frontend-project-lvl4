import { createSlice } from '@reduxjs/toolkit';

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
    },

    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload;
    },

    renameChannel: (state, { payload: { id, attributes } }) => {
      const channel = state.items.find((item) => item.id === id);
      channel.name = attributes.name;
    },

    removeChannel: (state, { payload: { id } }) => {
      const currentActiveChannel = state.activeChannelId;
      state.items = state.items.filter((item) => item.id !== id);
      state.activeChannelId = (currentActiveChannel !== id)
        ? currentActiveChannel
        : state.items[0].id;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
