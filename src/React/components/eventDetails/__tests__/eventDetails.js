import { getParsedDate, getLocation } from '../index';

describe("Date parser", () => {
  it('Should parse 09-30-1992 17:07', () => {
    const expected = {
      month: 'SEP',
      day: 30,
      weekDay: 'WED',
      time: '17:07',
      year: 1992,
    };

    const actual = getParsedDate('09-30-1992 17:07');

    expect(actual).toEqual(expected);
  });

  it('Should parse 12-20-1968 12:27', () => {
    const expected = {
      month: 'DEC',
      day: 20,
      weekDay: 'FRI',
      time: '12:27',
      year: 1968,
    };

    const actual = getParsedDate('12-20-1968 12:27');

    expect(actual).toEqual(expected);
  });

  it('Wrong date format 20-12-1968 12:27', () => {
    const expected = null;

    const actual = getParsedDate('20-12-1968 12:27');

    expect(actual).toEqual(expected);
  });
});

describe("Get Location String", () => {
  it('Durlești, Chisinau, Moldova', () => {
    const expected = 'Durlești, Chisinau, Moldova';
    const actual = getLocation({ city: 'Durlești', region: 'Chisinau', country: 'Moldova' });

    expect(actual).toEqual(expected);
  });

  it('Chisinau, Chisinau, Moldova', () => {
    const expected = 'Chisinau, Chisinau, Moldova';
    const actual = getLocation({ city: 'Chisinau', region: 'Chisinau', country: 'Moldova' });

    expect(actual).toEqual(expected);
  });

  it('Chisinau, Moldova', () => {
    const expected = 'Chisinau, Moldova';
    const actual = getLocation({ city: 'Chisinau', country: 'Moldova' });

    expect(actual).toEqual(expected);
  });

  it('Chisinau', () => {
    const expected = 'Chisinau'
    const actual = getLocation({ city: 'Chisinau' });

    expect(actual).toEqual(expected);
  });

  it('Moldova', () => {
    const expected = 'Moldova';
    const actual = getLocation({ country: 'Moldova' });

    expect(actual).toEqual(expected);
  });
});