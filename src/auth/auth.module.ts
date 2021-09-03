import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsuariosModule} from "../usuarios/usuarios.module"

@Module({
  providers: [AuthService],
  imports: [UsuariosModule],
})
export class AuthModule {}
