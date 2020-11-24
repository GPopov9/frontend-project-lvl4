import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel]: (state, { payload: { id } }) => {
      const newState = state.filter((m) => m.channelId !== id);
      return newState;
    },
  },

});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
