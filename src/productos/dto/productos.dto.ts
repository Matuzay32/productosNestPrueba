import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/role/role.enum";

export class CreateProductoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()

  price: number;
  @ApiProperty()

  description: string;
  @ApiProperty()

  imageUrl: string;
  @ApiProperty()

  createdAt: Date;

  // roles: Role[];  
}
