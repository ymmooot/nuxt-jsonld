import jsonld from '../src/index';

describe('merge strategy', () => {
  it('returns parentVal when childVal is empty', () => {
    const child = undefined;
    const parent = {
      script: [
        {
          hid: 2,
          innerHtml: 'test2',
        },
      ],
    };
    const mergedFn = jsonld.mergeStrategy(parent, child);
    expect(mergedFn()).toEqual(parent);
  });

  it('returns childVal when parentVal is empty', () => {
    const child = {
      script: [
        {
          hid: 1,
          innerHtml: 'test',
        },
      ],
    };
    const parent = undefined;
    const mergedFn = jsonld.mergeStrategy(parent, child);
    expect(mergedFn()).toEqual(child);
  });

  test('childVal and parentVal are both object', () => {
    const child = {
      script: [
        {
          hid: 1,
          innerHtml: 'test',
        },
      ],
    };
    const parent = {
      script: [
        {
          hid: 2,
          innerHtml: 'test2',
        },
      ],
    };
    const resFunc = jsonld.mergeStrategy(parent, child);
    expect(resFunc()).toEqual({ script: [{ hid: 1, innerHtml: 'test' }, { hid: 2, innerHtml: 'test2' }] });
  });

  test('both of childVal and parentVal are functions', () => {
    const child = () => ({
      script: [
        {
          hid: 1,
          innerHtml: 'test',
        },
      ],
    });
    const parent = () => ({
      script: [
        {
          hid: 2,
          innerHtml: 'test2',
        },
      ],
    });
    const resFunc = jsonld.mergeStrategy(parent, child);
    expect(resFunc()).toEqual({ script: [{ hid: 1, innerHtml: 'test' }, { hid: 2, innerHtml: 'test2' }] });
  });

  test('object already has __dangerouslyDisableSanitizersByTagID', () => {
    const child = {
      __dangerouslyDisableSanitizersByTagID: {
        foo: ['innerHTML'],
      },
    };
    const parent = {
      __dangerouslyDisableSanitizersByTagID: {
        bar: ['innerHTML'],
      },
    };
    const resFunc = jsonld.mergeStrategy(parent, child);
    expect(resFunc()).toEqual({
      __dangerouslyDisableSanitizersByTagID: {
        foo: ['innerHTML'],
        bar: ['innerHTML'],
      },
    });
  });
});

describe('exported object', () => {
  test('head of optionMergeStrategies', () => {
    const mockVue = {
      config: {
        optionMergeStrategies: {},
      },
      mixin: jest.fn(),
    };
    jsonld.install(mockVue);
    expect(mockVue.config.optionMergeStrategies.head).toBe(jsonld.mergeStrategy);
  });
});
