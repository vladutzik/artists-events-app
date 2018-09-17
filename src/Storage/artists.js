import localforage from 'localforage';

export const ArtsitStorage = localforage.createInstance({
  name: "artists"
});

export default ArtsitStorage;