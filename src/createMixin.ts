import Vue from 'vue';

interface Options {
  space?: number | string;
}

interface JsonldConfig {
  script?: {
    hid: string;
    type: string;
    innerHTML: string;
  }[];
  __dangerouslyDisableSanitizersByTagID?: {
    [key: string]: 'innerHTML';
  };
}

interface JsonldMixin {
  head: () => JsonldConfig;
}

export default (options: Options = {}): JsonldMixin => {
  const mergedOptions = {
    space: 2,
    ...options,
  };

  let counter = 0;

  return {
    head(this: Vue) {
      if (!this.$options || typeof this.$options.jsonld !== 'function') {
        return {};
      }

      if (this.$options.jsonld.call(this) === null) {
        return {};
      }

      const stringifiedJson = JSON.stringify(this.$options.jsonld.call(this), null, mergedOptions.space);
      const innerHTML = mergedOptions.space === 0 ? stringifiedJson : `\n${stringifiedJson}\n`;

      const hid = `nuxt-jsonld-${counter}`;
      counter += 1;
      return {
        script: [
          {
            hid,
            type: 'application/ld+json',
            innerHTML,
          },
        ],
        __dangerouslyDisableSanitizersByTagID: {
          [hid]: 'innerHTML',
        },
      };
    },
  };
};
