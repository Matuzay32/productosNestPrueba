import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/role/role.enum";

export class CreateDtoUsuario{
    @ApiProperty()
    user:string;
    @ApiProperty()
    
    password:string;
    @ApiProperty()

    email:string;
    @ApiProperty()
    
    roles: Role[];

}