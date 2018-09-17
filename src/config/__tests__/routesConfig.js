import { buildUrl } from '../routesConfig';

describe("Url Builder for local router", () => {
  it('Should return given url when no params was passed', () => {
    const expected = '/:artist';
    const actual = buildUrl('/:artist', {});

    expect(actual).toEqual(expected);
  });

  it('Should build url with one param', () => {
    const expected = '/linkin park';
    const actual = buildUrl('/:artist', { artist: 'linkin park' });

    expect(actual).toEqual(expected);
  });
  
  it('Should build url with 2 params', () => {
    const expected = '/linkin park/1992';
    const actual = buildUrl('/:artist/:year', { artist: 'linkin park', year: 1992 });

    expect(actual).toEqual(expected);
  });
});

