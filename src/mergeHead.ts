import { Options } from './createMixin';

interface JsonLDObject {
  script: object[];
  __dangerouslyDisableSanitizersByTagID: object;
}

const getOriginalHeadObject = (that, originalHead): JsonLDObject => {
  if (typeof originalHead === 'function') {
    return originalHead.call(that);
  }
  return originalHead || null;
};

function hashCode(s: string) {
  /**
   * Using the java hashCode function
   * https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   * https://www.thejavaprogrammer.com/what-is-hashcode-in-java/
   */
  let hash = 0;
  if (s.length === 0) {
    return hash;
  }
  for (let i = 0; i < s.length; i += 1) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char; // eslint-disable-line no-bitwise
    hash &= hash; // eslint-disable-line no-bitwise
  }
  return hash;
}

const getJsonLdHeadObject = (that, jsonLdFunc: Function, space: Options['space']): JsonLDObject => {
  const jsonLd = jsonLdFunc.call(that);
  if (jsonLd === null) {
    return null;
  }

  const minifiedString = JSON.stringify(jsonLd, null, '');
  const hid = `nuxt-jsonld-${hashCode(minifiedString).toString(16)}`;

  const stringifiedJson = JSON.stringify(jsonLd, null, space);
  const innerHTML = space === 0 ? stringifiedJson : `\n${stringifiedJson}\n`;

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

const isEmptyObject = (obj: object): boolean => obj === undefined || obj === null || Object.keys(obj).length === 0;

export default function mergeHead(originalHead, { space }: Options) {
  const head = getOriginalHeadObject(this, originalHead);
  const jsonLd = getJsonLdHeadObject(this, this.$options.jsonld, space);

  if (isEmptyObject(head) && jsonLd === null) {
    return {};
  }
  if (isEmptyObject(head)) {
    return jsonLd;
  }
  if (jsonLd === null) {
    return head;
  }

  return {
    ...head,
    script: [...(head.script || []), ...jsonLd.script],
    __dangerouslyDisableSanitizersByTagID: {
      ...(head.__dangerouslyDisableSanitizersByTagID || {}),
      ...jsonLd.__dangerouslyDisableSanitizersByTagID,
    },
  };
}
