module.exports = {
  head() {
    if (!this.$options || typeof this.$options.jsonld !== 'function') {
      return {};
    }

    const hid = `vue-jsonld-${this._uid}`;
    return {
      script: [
        {
          hid,
          type: 'application/ld+json',
          innerHTML: JSON.stringify(this.$options.jsonld.call(this), null, 2),
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: 'innerHTML',
      },
    };
  },
};
