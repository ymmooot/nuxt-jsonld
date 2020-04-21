interface Options {
  space?: number | string;
}

const stringifyLD = (options: Options, script: any[], disableSanitizers: object): Function =>
  function stringifyLDFn(): any {
    const jsonLd = this.$options.jsonld.call(this);

    if (jsonLd === null) {
      return {};
    }

    const stringifiedJson = JSON.stringify(jsonLd, null, options.space);
    const innerHTML = options.space === 0 ? stringifiedJson : `\n${stringifiedJson}\n`;
    // FIXME: private api
    const hid = `nuxt-jsonld-${this._uid}`;

    return {
      script: script.concat([
        {
          hid,
          type: 'application/ld+json',
          innerHTML,
        },
      ]),
      __dangerouslyDisableSanitizersByTagID: {
        ...disableSanitizers,
        [hid]: ['innerHTML'],
      },
    };
  };

export default function (pluginOpts: Options): Function {
  if (!this.$options) {
    return () => {};
  }

  this.$options.computed = this.$options.computed || {};

  let script = [];
  let disableSanitizers = {};

  if (this.$options.head) {
    if (typeof this.$options.head === 'function') {
      this.$options.computed.$head = this.$options.head;
      const head = this.$options.head.call(this)
      script = head.script || [];
      disableSanitizers = head.__dangerouslyDisableSanitizersByTagID || {};
    } else {
      this.$head = this.$options.head;
      script = this.$options.head.script || [];
      disableSanitizers = this.$options.head.__dangerouslyDisableSanitizersByTagID || {};
    }
  }

  this.$options.computed.$jsonld = stringifyLD(pluginOpts, script, disableSanitizers);

  return () => ({ ...this.$head, ...this.$jsonld });
}
