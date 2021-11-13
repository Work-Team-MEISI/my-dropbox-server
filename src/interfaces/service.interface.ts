export interface IService<T> {
  fetchBulk<K>(queryParam?: K): Promise<Array<T>>;
  fetch<K>(queryParam?: K): Promise<T>;
  create<K, P>(queryParam?: K, body?: P): Promise<T>;
  update<K, P>(queryParam?: K, body?: P): Promise<T>;
  delete<K>(queryParam?: K): Promise<boolean>;
  deleteBulk<K>(queryParam?: K): Promise<boolean>;
}
