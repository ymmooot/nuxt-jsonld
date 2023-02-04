import type { Ref } from 'vue';
import type { WithContext, Graph, Thing } from 'schema-dts';

export * from 'schema-dts';

export type MaybeRef<T> = T | Ref<T>;
export type FieldMaybeRef<T> = {
  [P in keyof T]: MaybeRef<T[P]>;
};

type FieldMaybeRefBase = FieldMaybeRef<WithContext<Thing>>

export type JsonLDObj =
  | FieldMaybeRefBase
  | FieldMaybeRefBase[]
  | FieldMaybeRef<Graph>
  | null;
export type JsonLDFunc = () => JsonLDObj;
export type JsonLD = JsonLDObj | JsonLDFunc;
