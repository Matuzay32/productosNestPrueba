import{ExtractJwt,Strategy}from "passport-jwt"
import{PassportStrategy}from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { UsuariosService } from "src/usuarios/usuarios.service"
import { secret } from "src/usuarios/interfaces/usuario.interface"
@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){
constructor(private userService:UsuariosService){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration:false,
        secretOrKey:secret.secretKey
    })
}

    async validate(payload:any){
        const {sub: id} = payload;
        return await this.userService.findOneUser(id);

    }

}