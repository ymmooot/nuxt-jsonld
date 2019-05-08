module.exports = options => {
  const mergedOptions = {
    space: 2,
    ...(options || {}),
  };

  return {
    head() {
      if (!this.$options || typeof this.$options.jsonld !== 'function') {
        return {};
      }

      const hid = `nuxt-jsonld-${this._uid}`;
      return {
        script: [
          {
            hid,
            type: 'application/ld+json',
            innerHTML: JSON.stringify(this.$options.jsonld.call(this), null, mergedOptions.space),
          },
        ],
        __dangerouslyDisableSanitizersByTagID: {
          [hid]: 'innerHTML',
        },
      };
    },
  };
};
