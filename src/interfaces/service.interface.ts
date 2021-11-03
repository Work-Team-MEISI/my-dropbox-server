export interface IService<T> {
  fetchBulk<V>(queryParam?: V): Promise<Array<T>>;
  fetch<V>(queryParam: V): Promise<T>;
  create<K>(data: K): Promise<T>;
  update<K, V>(queryParam: V, data: K): Promise<T>;
  delete<V>(queryParam: V): Promise<boolean>;
}
