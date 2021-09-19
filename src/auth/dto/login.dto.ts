import { ApiProperty } from "@nestjs/swagger";

export class LoginDtoUser{
    @ApiProperty()
    user:string
    @ApiProperty()
    password:string;
    @ApiProperty()
    email:string;

}