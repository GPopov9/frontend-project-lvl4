export const selectChannels = (state) => state.channels.items;

export const selectChannelNames = (state) => state.channels.items.map(({ name }) => name);

export const selectActiveChannel = ((state) => state.channels.items
  .find(({ id }) => id === state.channels.activeChannelId));

export const selectMessages = ((state) => state.messages
  .filter(({ channelId }) => channelId === state.channels.activeChannelId));

export const selectActiveChannelId = ((state) => state.channels.activeChannelId);
