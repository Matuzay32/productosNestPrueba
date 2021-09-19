import { Role } from "src/role/role.enum";

export interface ProductoInterface {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: Date;
  // roles: Role[];
}
