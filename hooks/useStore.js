import create from "zustand";

const store = create(set => ({
  programName: '닥터케어유니온',
  temp: null,
  isLogin: null,
  setState: (type, payload) => set(state => {
    if (!type) return console.warn('type is not found!!');
    if (typeof(type) !== 'string') return console.warn('type is not string!!');
    return state[type] = payload;
  })
}));

export default store;