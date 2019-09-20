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
  const head = [];

  if (!this.$options) { return; }

  if (this.$options.head) {
    head.push(this.$options.head);
  }

  if (this.$options.jsonld) {
    head.push(stringifyLD(pluginOpts))
  }

  return () => {
    if (!head) { return {} }

    if (!Array.isArray(head)) {
      return head;
    }

    return head.reduce((acc, i) => {
      switch (typeof i) {
        case 'function':
          Object.assign(acc, i.call(this));
          break;
        case 'object':
          Object.assign(acc, i);
          break;
      }
      return acc;
    }, {})
  }
};
