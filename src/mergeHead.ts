import XXH from 'xxhashjs';
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

const getJsonLdHeadObject = (that, jsonLdFunc: Function, space: Options['space']): JsonLDObject => {
  if (!jsonLdFunc) {
    return null;
  }

  const jsonLd = jsonLdFunc.call(that);
  if (jsonLd === null) {
    return null;
  }

  const minifiedString = JSON.stringify(jsonLd, null, '');
  const hid = `nuxt-jsonld-${XXH.h32(minifiedString, 0).toString(16)}`;

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
  if (!this.$options) {
    this.$options = {};
  }

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
