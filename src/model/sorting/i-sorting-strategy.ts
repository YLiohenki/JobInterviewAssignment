export interface ISortingStrategy<T> {
  name: string;
  compare: (object1: T, object2: T) => number;
}
