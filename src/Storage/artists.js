import localforage from 'localforage';

export const ArtistStorage = localforage.createInstance({
  name: "artists"
});

export const removeArtist = (name) => {
  return ArtistStorage.removeItem(name);
};

export default ArtistStorage;