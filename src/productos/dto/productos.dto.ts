import { ApiProperty } from "@nestjs/swagger";

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
}
