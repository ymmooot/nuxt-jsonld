import jsonld from '../src/index';

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
