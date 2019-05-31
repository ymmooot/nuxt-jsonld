import jsonld from '../src/index';

describe('merge strategy', () => {
  it('returns toVal when fromVal is empty', () => {
    const from = undefined;
    const to = {
      script: [
        {
          hid: 2,
          innerHtml: 'test2',
        },
      ],
    };
    const res = jsonld.mergeStrategy(to, from);
    expect(res).toEqual(to);
  });

  it('returns fromVal when toVal is empty', () => {
    const from = {
      script: [
        {
          hid: 1,
          innerHtml: 'test',
        },
      ],
    };
    const to = undefined;
    const res = jsonld.mergeStrategy(to, from);
    expect(res).toEqual(from);
  });

  test('fromVal and toVal are both object', () => {
    const from = {
      script: [
        {
          hid: 1,
          innerHtml: 'test',
        },
      ],
    };
    const to = {
      script: [
        {
          hid: 2,
          innerHtml: 'test2',
        },
      ],
    };
    const resFunc = jsonld.mergeStrategy(to, from);
    expect(resFunc()).toEqual({ script: [{ hid: 1, innerHtml: 'test' }, { hid: 2, innerHtml: 'test2' }] });
  });
});
