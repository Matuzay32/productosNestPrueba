import { ApiProperty } from "@nestjs/swagger";

export class LoginDtoUser{
    @ApiProperty()
    password:string;
    @ApiProperty()
    
    email:string;

}