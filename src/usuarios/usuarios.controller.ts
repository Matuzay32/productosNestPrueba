import { UsuariosService } from './usuarios.service';
import{CreateUsuarioInterface} from "./interfaces/usuario.interface"
import {CreateDtoUsuario} from "./dto/usuario.dto"
import { Response,Request } from 'express';
import { ApiProperty,ApiTags,ApiBody,ApiOkResponse,ApiQuery,ApiParam,ApiBearerAuth} from '@nestjs/swagger';
import { AuthGuard, } from '@nestjs/passport';
import { Body, Controller, Delete,UseGuards, Get, Param, Post,NotFoundException ,Put,Query,Res} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import {Role} from "../role/role.enum"
import { RolesGuard } from 'src/role/roles.guard';




@ApiTags(`Users`)
@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  
  @ApiBody({
    description: 'create User',
    type: CreateDtoUsuario,
  })
  @Post()
  @ApiOkResponse({
    description: 'response  User',
    type: CreateDtoUsuario,
    isArray:true
  })
  
  async createUser(@Body()CreateDtoUsuario:CreateDtoUsuario):Promise<{token:string} | CreateDtoUsuario> {
    
    // if (CreateDtoUsuario.roles !=["admin"]) throw new NotFoundException("El rol es incorrecto")

    for (let index = 0; index < CreateDtoUsuario.roles.length; index++) {

     if( CreateDtoUsuario.roles[index] =="admin"|| CreateDtoUsuario.roles[index] =="user"){
    return await this.usuariosService.createUser(CreateDtoUsuario);


     }else{
      throw new NotFoundException("Debe ingresar un tipo de rol correcto")

     }
      
    }

    
    
  }
  
  
  @ApiOkResponse({
    description: 'User find',
    type: CreateDtoUsuario,
  })


  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiParam({name: 'id', required: true, description: "poner id para encontrar usuario"})
  @Get("/:id")
  findOne(@Param("id")id:string):Promise<CreateDtoUsuario>{
    return this.usuariosService.findOneUser(id);


  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User delete',
    type: CreateDtoUsuario,
  })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiParam({name: 'id', required: true, description: "poner id para borrar usuario"})
  @Delete("/:id")
  deleteUser(@Param("id")id:string):Promise<CreateDtoUsuario>{
    return this.usuariosService.deleteUser(id);


  }
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
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

 @Roles(Role.Admin)
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @ApiBearerAuth()
  @Get()
  getAllUsers():Promise<CreateDtoUsuario[]> {
    return this.usuariosService.findAllUsers();
  }


}
