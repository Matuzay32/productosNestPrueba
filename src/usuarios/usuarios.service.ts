import { Injectable } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import {InjectModel}  from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UsuarioSchema} from "./schemas/usuario.schema";
import { CreateDtoUsuario } from './dto/usuario.dto';
import {CreateUsuarioInterface} from "./interfaces/usuario.interface"


@Injectable()
export class UsuariosService {
  constructor(@InjectModel("Usuarios") private usuariosModel: Model<CreateUsuarioInterface>){}

  async  createUser(userCreate:CreateDtoUsuario):Promise<CreateUsuarioInterface>{
        const usuario= this.usuariosModel.create(userCreate);
       return (await usuario).save();
    }

  async  findAllUsers():Promise<CreateUsuarioInterface[]>{
        return await this.usuariosModel.find();
    }

   async findOneUser(id:string):Promise<CreateUsuarioInterface>{
       return await this.usuariosModel.findById(id);
    }
   async deleteUser(id:string):Promise<CreateUsuarioInterface>{
        return await this.usuariosModel.findByIdAndDelete(id);

     }

     async updateUser(id:string, dto:CreateDtoUsuario){
      return await this.usuariosModel.findByIdAndUpdate(id, dto);
     }

}
