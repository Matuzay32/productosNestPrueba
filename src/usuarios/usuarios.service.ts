import { Injectable,NotFoundException} from '@nestjs/common';
import { Mongoose } from 'mongoose';
import {InjectModel}  from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UsuarioSchema} from "./schemas/usuario.schema";
import { CreateDtoUsuario } from './dto/usuario.dto';
import {CreateUsuarioInterface} from "./interfaces/usuario.interface"
import * as bcrypt from 'bcrypt';




@Injectable()
export class UsuariosService {
  constructor(@InjectModel("Usuarios") private usuariosModel: Model<CreateUsuarioInterface>){}
   //con esta funcion ecripto la password
  async encriptPassword(userCreate:CreateDtoUsuario){
   const salt = await bcrypt.genSalt(10);
   const password = userCreate.password;
   const hash = await bcrypt.hash(password, salt);
  return userCreate.password =hash;
  }
  async comparePassWord(hash,password){

   const isMatch = await bcrypt.compare(password, hash);

  }
  async  createUser(userCreate:CreateDtoUsuario):Promise<CreateUsuarioInterface>{
         const userExist= await this.usuariosModel.findOne({email:userCreate.email});

         if(userExist)throw new NotFoundException("El Usuario ya se encuentra en la base de datos");
         //ENCRIPTO PASSWORD
        await this.encriptPassword(userCreate)
       

         const usuario= this.usuariosModel.create(userCreate);
            

       return (await usuario).save();
    }

  async  findAllUsers():Promise<CreateUsuarioInterface[]>{
         console.log(this.usuariosModel.find());
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
