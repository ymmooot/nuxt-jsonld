module.exports = (options = {}) => {
  const mergedOptions = {
    space: 2,
    ...options,
  };

  return {
    head() {
      if (!this.$options || typeof this.$options.jsonld !== 'function') {
        return {};
      }

      const stringifiedJson = JSON.stringify(this.$options.jsonld.call(this), null, mergedOptions.space);
      const innerHTML = mergedOptions.space === 0 ? stringifiedJson : `\n${stringifiedJson}\n`;

      const hid = `nuxt-jsonld-${this._uid}`;
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
