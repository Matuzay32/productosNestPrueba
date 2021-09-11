import { Controller, Post,Get, UseGuards, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators';
import {CreateUsuarioInterface,Config,secret}from "../usuarios/interfaces/usuario.interface"
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){

    }
    @UseGuards(AuthGuard("local"))
    
    @Post("login")
     async login(@User()user){
        
        const data = await this.authService.login(user);


        return {message: "success login",accessToken:data.accessToken};

    }
    @UseGuards(AuthGuard("jwt"))
    @Get("profileAcount")
    profileAcount(){
        return "se autorizo perfectamente el usuario, datos de cuenta" 
    }
}
