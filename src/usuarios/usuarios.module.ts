import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuarios', schema: UsuarioSchema }]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports:[UsuariosService]
})
export class UsuariosModule {}



