import Vue from 'vue';
import Component from 'vue-class-component';
import Jsonld from '../src/decorator';

describe('Jsonld decorator', () => {
  test('typecheck', () => {
    const checker = {};

    @Jsonld
    @Component
    class MockComponent extends Vue {
      jsonld() {
        return checker;
      }
    }

    const component = new MockComponent();

    expect(component.jsonld).toBeUndefined();
    expect(component.$options.jsonld()).toBe(checker);
  });
});
