import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import {compare} from"bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userServis:UsuariosService){}


    async validateUser(email:string,password:string):Promise<any>{
        const user= await this.userServis.findByEmail(email);
        if(user&& await compare(password,user.password)){
            return user;
        }

        return null;
    }
}
