interface Options {
  space?: number | string;
}

let jsonID = 1;

const stringifyLD = (options: Options) => function () {
  const jsonLd = this.$options.jsonld.call(this);

  if (jsonLd !== null) {
    const stringifiedJson = JSON.stringify(jsonLd, null, options.space);
    const innerHTML = options.space === 0 ? stringifiedJson : `\n${stringifiedJson}\n`;

    const hid = `nuxt-jsonld-${jsonID++}`;

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
      }
    }
  }
}

export default function (pluginOpts: Options) {
  if (!this.$options) { return; }

  this.$options.computed = this.$options.computed || {}

  this.$options.computed.$jsonld = stringifyLD(pluginOpts)

  if (this.$options.head) {
    if (typeof this.$options.head === 'function') {
      this.$options.computed.$head = this.$options.head;
    } else {
      this.$head = this.$options.head;
    }
  }

  return () => Object.assign({}, this.$head, this.$jsonld)
};
