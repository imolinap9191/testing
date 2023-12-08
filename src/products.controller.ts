import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Param,
  Res,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './Iproducts';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Product {
    return this.productsService.findById(id);
  }

  @Post()
  create(@Body() product: Product): Product {
    return this.productsService.create(product);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updatedProducts: Product): Product {
    return this.productsService.update(id, updatedProducts);
  }
  @Delete(':id')
  delete(@Param(':id') id: string): Product {
    return this.productsService.delete(id);
  }
}
