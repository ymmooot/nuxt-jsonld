interface Options {
  space?: number | string;
}

const stringifyLD = (options: Options, headScript: any[]): Function =>
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
      script: headScript.concat([
        {
          hid,
          type: 'application/ld+json',
          innerHTML,
        },
      ]),
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: ['innerHTML'],
      },
    };
  };

export default function (pluginOpts: Options): Function {
  if (!this.$options) {
    return () => {};
  }

  this.$options.computed = this.$options.computed || {};

  let headScript = []

  if (this.$options.head) {
    if (typeof this.$options.head === 'function') {
      this.$options.computed.$head = this.$options.head;
      headScript = this.$options.head().script;
    } else {
      this.$head = this.$options.head;
      headScript = this.$options.head.script;
    }
  }

  this.$options.computed.$jsonld = stringifyLD(pluginOpts, headScript);

  return () => ({ ...this.$head, ...this.$jsonld });
}
