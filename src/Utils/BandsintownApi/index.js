import ApiInterface from '../ApiInterface';
import config from './config';

class Bandsintown extends ApiInterface {
  constructor(host = config.host, endpoints = config.endpoints, app_id = config.app_id) {
    super(host, endpoints, app_id);
  }

  getArtist = (artistName) => {
    return this.get(this.endpoints.artist, { params: { artistName } });
  }

  getArtistEvents = (artistName) => {
    return this.get(this.endpoints.artistEvents, { params: { artistName } });
  }
}

export const BandsintownInstance = new Bandsintown();

export default Bandsintown;