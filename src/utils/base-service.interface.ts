export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface BaseServices<T, Dto> {
  findAll(): Promise<T[]>;
  create(data: Dto): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<T>;
  findById(id: number): Promise<T | null>;
}
