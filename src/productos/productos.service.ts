import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductosSchema } from './schemas/producto.schema';
import { CreateProductoDto } from './dto/productos.dto';
import {ProductoInterface} from "./interfaces/producto.interface"

@Injectable()
export class ProductosService {
    constructor(@InjectModel("Productos") private productoModel: Model<ProductoInterface>) {}

    async create(CreateProductoDto: CreateProductoDto): Promise<ProductoInterface> {
        //este seria el metodo 1
        
        /* const createdProducto = new this.productoModel(CreateProductoDto);
        console.log(CreateProductoDto);
        return createdProducto.save(); */


        // este seria el metodo dos de crear un producto y el que mas me gusto
        const producto =this.productoModel.create(CreateProductoDto);
        return (await producto).save(); 

      }

    async findAll():Promise<ProductoInterface[]>{
          return this.productoModel.find();

      }
    async findOne(id:string):Promise<ProductoInterface>{
        const producto = await this.productoModel.findById(id);
        return  producto;

      }
    async updateProduct(id:string,createProductDto:CreateProductoDto):Promise<ProductoInterface>{
        return await this.productoModel.findByIdAndUpdate(id,createProductDto);



      } 
    async deleteProduct(id:string):Promise<ProductoInterface>{
      const producto= await this.productoModel.findByIdAndDelete(id);
      return producto;


      }

}
