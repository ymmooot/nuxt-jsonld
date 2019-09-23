import XXH from 'xxhashjs';

interface Options {
  space?: number | string;
}

const stringifyLD = (options: Options): Function =>
  function stringifyLDFn(): any {
    const jsonLd = this.$options.jsonld.call(this);

    if (jsonLd === null) {
      return {};
    }

    const stringifiedJson = JSON.stringify(jsonLd, null, options.space);
    const innerHTML = options.space === 0 ? stringifiedJson : `\n${stringifiedJson}\n`;
    const hid = `nuxt-jsonld-${XXH.h32(innerHTML, 0).toString(16)}`;

    return {
      script: [
        {
          hid,
          type: 'application/ld+json',
          innerHTML,
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: ['innerHTML'],
      },
    };
  };

export default function(pluginOpts: Options): Function {
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
