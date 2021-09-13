import { Controller, Get,Post,Delete,Put,Body,Param,Query,Res,MethodNotAllowedException,HttpException,HttpModuleOptions,HttpStatus} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import{CreateUsuarioInterface} from "./interfaces/usuario.interface"
import {CreateDtoUsuario} from "./dto/usuario.dto"
import { Response } from 'express';
import { ApiProperty,ApiTags,ApiBody,ApiOkResponse,ApiQuery,ApiParam} from '@nestjs/swagger';

@ApiTags(`Users`)
@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  
  
  @Post()
  @ApiBody({
    description: 'create User',
    type: CreateDtoUsuario,
  })
  async createUser(@Body()CreateDtoUsuario:CreateDtoUsuario):Promise<{token:string} | CreateDtoUsuario> {
    return await this.usuariosService.createUser(CreateDtoUsuario);
    
  }
  @ApiOkResponse({
    description: 'response  User',
    type: CreateDtoUsuario,
    isArray:true
  })
  @Get()
  getAllUsers():Promise<CreateDtoUsuario[]> {
    return this.usuariosService.findAllUsers();
  }
  @ApiOkResponse({
    description: 'User find',
    type: CreateDtoUsuario,
  })

  @ApiParam({name: 'id', required: true, description: "poner id para encontrar usuario"})
  @Get("/:id")
  findOne(@Param("id")id:string):Promise<CreateDtoUsuario>{
    return this.usuariosService.findOneUser(id);


  }


  @ApiOkResponse({
    description: 'User delete',
    type: CreateDtoUsuario,
  })
  @ApiParam({name: 'id', required: true, description: "poner id para borrar usuario"})
  @Delete("/:id")
  deleteUser(@Param("id")id:string):Promise<CreateDtoUsuario>{
    return this.usuariosService.deleteUser(id);


  }

  @ApiQuery({ name: 'id' , description: "poner id para actualizar el usuario"})
  @ApiBody({
   description: 'Update user',
   type: CreateDtoUsuario,
 })
  @Put()
   updateUsuario(@Res() res: Response,@Body()updateDto:CreateDtoUsuario, @Query("id")id ):Promise<CreateDtoUsuario>{
    const usuario = this.usuariosService.updateUser(id,updateDto);

    res.send({updateDto,Update:"OK" });
    return usuario;
       
    }



}
