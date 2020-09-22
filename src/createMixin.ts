import Vue from 'vue';
import mergeHead from './mergeHead';

type Required<T> = { [P in keyof T & keyof any]: T[P] };
type UserOptions = {
  space?: number | string;
};
export type Options = Required<UserOptions>;
type JsonldMixin = {
  beforeCreate: () => void;
};

export default (_options: UserOptions = {}): JsonldMixin => {
  const options: Options = {
    space: 2,
    ..._options,
  };

  return {
    beforeCreate(this: Vue) {
      const originalHead = this.$options.head;

      this.$options.head = () => {
        return mergeHead.call(this, originalHead, options);
      };
    },
  };
};
