export const extractJsonldFromHead = ($head): string => {
  const tags = $head.headTags.filter(
    (t) => t.tag === 'script' && t.props.type === 'application/ld+json'
  );
  const jsons = tags.map((t) => t.props.children).filter((t) => t);
  if (!jsons.length) {
    return;
  }
  return jsons.map((j) => JSON.stringify(JSON.parse(j), null, 4)).join(',\n');
};

export const getJsonldForDemo = {
  data() {
    return {
      _time: new Date(),
    };
  },
  computed: {
    jsonld(): string {
      // trigger to update
      this._time;
      return extractJsonldFromHead(this.$head);
    },
  },
  watch: {
    $head: {
      async handler() {
        await nextTick();
        this._time = new Date();
      },
      immediate: true,
    },
  },
};
