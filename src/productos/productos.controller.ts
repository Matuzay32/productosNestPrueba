import { Body, Controller, Delete, Get, Param, Post,NotFoundException ,Put,Query,Res} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductoInterface } from './interfaces/producto.interface';
import { CreateProductoDto } from './dto/productos.dto';
import{Response}from "express";
import { ApiBody,ApiBearerAuth,ApiTags,ApiResponse,ApiProperty,ApiOkResponse,ApiParam,ApiQuery} from '@nestjs/swagger';

@ApiTags("Products")
@Controller('productos')
export class ProductosController {
  constructor(private readonly productoServ: ProductosService) {}

  @ApiOkResponse({
    description: 'List of products',
    type: CreateProductoDto,
    isArray:true
  })
  @Get()
  findAll():Promise<CreateProductoDto[]> {
    return this.productoServ.findAll();
  }


  @ApiOkResponse({
    description: 'List of products',
    type: CreateProductoDto,
  })
  @ApiParam({name: 'id', required: true, description: "poner id para obtener el producto"})
  @Get("/:id")
 async findOne(@Param("id")id){
  const producto=await this.productoServ.findOne(id);
     if(!producto)throw new NotFoundException("no existe el producto");
     console.log(producto)
     return producto;
  }
  
  
  @ApiBody({
    description: 'List of products',
    type: CreateProductoDto,
    isArray:true
  })
  @Post()
  async create(@Body() CreateProductoDto: CreateProductoDto[]) {
    CreateProductoDto.forEach((element) => {
      console.log(element);
      this.productoServ.create(element);
    });
  }

  @ApiOkResponse({
    description: 'List of products',
    type: CreateProductoDto,
  })
  @ApiParam({name: 'id', required: true, description: "poner id para borrar producto"})
  @Delete("/:id")
  
  async deleteProduct(@Param("id")id ){
   const producto=await this.productoServ.deleteProduct(id);
      if(!producto)throw new NotFoundException("no existe el producto");
      console.log(producto)
      return producto;
   }


   @ApiQuery({ name: 'id' })
   @ApiBody({
    description: 'List of products',
    type: CreateProductoDto,
  })
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

