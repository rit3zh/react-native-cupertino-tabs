jest.mock('react-native-nitro-modules', () => ({
  getHostComponent: (name) => name,
  callback: (fn) => fn,
  NitroModules: {},
}));
