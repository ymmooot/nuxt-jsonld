import type { WithContext, Thing } from 'schema-dts';
export type JsonLD = WithContext<Thing> | WithContext<Thing>[] | null;
export type JsonLDFunc = () => JsonLD;
