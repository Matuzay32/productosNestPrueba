import { Controller, Get,Post,Delete,Put,Body,Param,Query,Res,MethodNotAllowedException,HttpException,HttpModuleOptions,HttpStatus} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import{CreateUsuarioInterface} from "./interfaces/usuario.interface"
import {CreateDtoUsuario} from "./dto/usuario.dto"
import { Response } from 'express';

@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async createUser(@Body()CreateDtoUsuario:CreateDtoUsuario):Promise<CreateUsuarioInterface> {
    
    return await this.usuariosService.createUser(CreateDtoUsuario);
    
  }

  @Get()
  getAllUsers():Promise<CreateUsuarioInterface[]> {
    return this.usuariosService.findAllUsers();
  }

  @Delete("/:id")
  deleteUser(@Param("id")id:string):Promise<CreateUsuarioInterface>{
    return this.usuariosService.deleteUser(id);


  }
  @Put()
   updateUsuario(@Res() res: Response,@Body()updateDto:CreateDtoUsuario, @Query("id")id ):Promise<CreateUsuarioInterface>{
    const usuario = this.usuariosService.updateUser(id,updateDto);

    res.send({updateDto,Update:"OK" });
    return usuario;
       
    }



}
