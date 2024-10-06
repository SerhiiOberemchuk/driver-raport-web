export interface UserDocument {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  lastName?: string;
  phone?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
