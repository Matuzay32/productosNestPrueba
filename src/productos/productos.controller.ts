import { Body, Controller, Delete, Get, Param, Post,NotFoundException ,Put,Query,Res} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductoInterface } from './interfaces/producto.interface';
import { CreateProductoDto } from './dto/productos.dto';
import{Response}from "express";
import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('productos')
export class ProductosController {
  constructor(private readonly productoServ: ProductosService) {}
  @Get()
  findAll() {
    return this.productoServ.findAll();
  }



  @Get("/:id")
 async findOne(@Param("id")id){
  const producto=await this.productoServ.findOne(id);
     if(!producto)throw new NotFoundException("no existe el producto");
     console.log(producto)
     return producto;
  }


  @Post()
  async create(@Body() CreateProductoDto: CreateProductoDto[]) {
    CreateProductoDto.forEach((element) => {
      console.log(element);
      this.productoServ.create(element);
    });
  }


  @Delete("/:id")
  async deleteProduct(@Param("id")id){
   const producto=await this.productoServ.deleteProduct(id);
      if(!producto)throw new NotFoundException("no existe el producto");
      console.log(producto)
      return producto;
   }



   @Put()
   // de esta forma se puede hacer un metodo put por la busqueda o query
   //es similar al param
   
   async updateProduct(@Res() res: Response,@Body()creaDto:CreateProductoDto, @Query("id")id ){
    const producto=await this.productoServ.updateProduct(id,creaDto);
    res.send({creaDto, update:"OK"});
       if(!producto)throw new NotFoundException("no existe el producto");
       console.log(producto)
       return producto;
    }
 




}

