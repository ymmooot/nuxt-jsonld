import { ref } from 'vue';
import type { BreadcrumbList, Graph, Person, Product, Thing, WithContext } from 'schema-dts';
import { useJsonld } from '../src/runtime/composable';
import type { JsonLD, JsonLDFunc } from '../src/runtime/types';

const name = ref('foo');

useJsonld({ '@context': 'https://schema.org', '@type': 'Person', name: 'foo' });
useJsonld(() => ({ '@context': 'https://schema.org', '@type': 'Person', name: name.value }));
useJsonld(() => (name.value ? { '@context': 'https://schema.org', '@type': 'Person' } : null));
useJsonld(() => null);
useJsonld(null);
useJsonld({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', name: 'foo' },
    { '@type': 'Thing', name: 'bar' },
  ],
});
useJsonld([{ '@context': 'https://schema.org', '@type': 'Person', name: 'foo' }]);
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [1, 2].map((position) => ({ '@type': 'ListItem' as const, position })),
});
useJsonld(
  { '@context': 'https://schema.org', '@type': 'Person', name: 'foo' },
  { tagPosition: 'bodyClose' }
);

const product: WithContext<Product> = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'foo',
};
useJsonld(product);
useJsonld((): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [],
}));
const author: Person = { '@type': 'Person', name: 'foo' };
useJsonld({ '@context': 'https://schema.org', '@type': 'Article', author });

declare const jsonld: JsonLD;
declare const jsonldFunc: JsonLDFunc;
declare const thing: WithContext<Thing>;
declare const things: WithContext<Thing>[];
declare const graph: Graph;
useJsonld(jsonld);
useJsonld(jsonldFunc);
useJsonld(thing);
useJsonld(things);
useJsonld(graph);

// @ts-expect-error wrong type of a property
useJsonld({ '@context': 'https://schema.org', '@type': 'Person', name: 123 });
// @ts-expect-error unknown @type
useJsonld({ '@context': 'https://schema.org', '@type': 'Persn', name: 'foo' });
// @ts-expect-error unknown property
useJsonld({ '@context': 'https://schema.org', '@type': 'Person', nmae: 'foo' });
// @ts-expect-error property of another type
useJsonld({ '@context': 'https://schema.org', '@type': 'Person', isbn: 'foo' });
// @ts-expect-error missing @context
useJsonld({ '@type': 'Person', name: 'foo' });
// @ts-expect-error a ref is not resolved, pass a function instead
useJsonld({ '@context': 'https://schema.org', '@type': 'Person', name });
// @ts-expect-error unknown option
useJsonld({ '@context': 'https://schema.org', '@type': 'Person', name: 'foo' }, { foo: 'bar' });
