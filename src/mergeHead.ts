import JsonLDParser from './JsonLDParser';

export interface Options {
  space?: number | string;
}

const stringifyLD = (options: Options): Function =>
  function stringifyLDFn(): any {
    const jsonLd = this.$options.jsonld.call(this);

    if (jsonLd === null) {
      return {};
    }

    return JsonLDParser.call(this, jsonLd, options);
  };

export default function (pluginOpts: Options): Function {
  if (!this.$options) {
    return () => {};
  }

  this.$options.computed = this.$options.computed || {};

  this.$options.computed.$jsonld = stringifyLD(pluginOpts);

  if (this.$options.head) {
    if (typeof this.$options.head === 'function') {
      this.$options.computed.$head = this.$options.head;
    } else {
      this.$head = this.$options.head;
    }
  }

  return () => ({ ...this.$head, ...this.$jsonld });
}
