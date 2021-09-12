import { ApiProperty } from "@nestjs/swagger";

export class CreateDtoUsuario{
    @ApiProperty()
    user:string;
    @ApiProperty()
    
    password:string;
    @ApiProperty()

    email:string;

}