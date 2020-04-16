import { Options } from './mergeHead';

const parseSimple = function (jsonLd: Object, options: Options) {
  const stringifiedJson = JSON.stringify(jsonLd, null, options.space);
  const innerHTML = options.space === 0 ? stringifiedJson : `\n${stringifiedJson}\n`;
  // FIXME: private api
  const hid = `nuxt-jsonld-${this._uid}`;
  return {
    hid,
    type: 'application/ld+json',
    innerHTML,
  };
};

const JsonLDParser = function (jsonLd: Object, options: Options) {
  const scripts = [];
  const hids = {};

  if (Array.isArray(jsonLd)) {
    scripts.push(
      ...Object.values(jsonLd).map((json) => {
        const j = parseSimple.call(this, json, options);
        hids[j.hid] = ['innerHTML'];
        return j;
      })
    );
  } else {
    const j = parseSimple.call(this, jsonLd, options);
    hids[j.hid] = ['innerHTML'];
    scripts.push(j);
  }

  return {
    script: scripts,
    __dangerouslyDisableSanitizersByTagID: hids,
  };
};

export default JsonLDParser;
