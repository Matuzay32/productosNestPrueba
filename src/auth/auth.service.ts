import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import {compare} from"bcrypt";
import {sign}  from "jsonwebtoken"
import {Config,CreateUsuarioInterface,secret} from "../usuarios/interfaces/usuario.interface";
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/decorators';

@Injectable()
export class AuthService {
    constructor(private readonly userServis:UsuariosService,
                 private readonly jwtService:JwtService
        
        ){}


    async validateUser(email:string,password:string):Promise<any>{
        const user= await this.userServis.findByEmail(email);
        if(user&& await compare(password,user.password)){
            return user;
        }

        return null;
    }


    async login(user){
        console.log(user);

        const{id, ...rest} =user;
        const payload ={sub: id};

        return{
            ...rest,
            accessToken:this.jwtService.sign(payload)     }
        
    }
}
