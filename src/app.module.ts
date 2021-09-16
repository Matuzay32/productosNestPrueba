import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import{roles} from "./app.roles"

@Module({
  imports: [
    ProductosModule,UsuariosModule,
    MongooseModule.forRoot('mongodb://localhost/productosApi1'),
    AuthModule,
    AccessControlModule.forRoles(roles)
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
