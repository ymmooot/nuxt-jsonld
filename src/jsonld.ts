import { Thing, WithContext } from 'schema-dts';

export type JsonldFunc = () => WithContext<Thing> | WithContext<Thing>[] | null;
