export const Store = {
  state: {
    user: null,
    events: []
  },

  set(key, value) {
    this.state[key] = value;
  },

  get(key) {
    return this.state[key];
  }
};
