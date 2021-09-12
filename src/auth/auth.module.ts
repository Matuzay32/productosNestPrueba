import { Module ,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import {UsuariosModule}from "../usuarios/usuarios.module"
import { LocalStrategy ,JwtStrategy} from './strategies';
import { JwtModule } from '@nestjs/jwt';
import{secret }from "../usuarios/interfaces/usuario.interface"

@Module({
  imports: [PassportModule,UsuariosModule,PassportModule, 
    JwtModule.register({
    secret: secret.secretKey,
    signOptions: { expiresIn: '15min' },
  }),],

  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
