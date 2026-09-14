import type { WithContext, Graph, Thing } from 'schema-dts';
export type JsonLD = WithContext<Thing> | WithContext<Thing>[] | Graph | null;
export type JsonLDFunc = () => JsonLD;
