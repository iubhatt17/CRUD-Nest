import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Response } from 'express';

@Controller('product')
export class ProductController {
    
    constructor(private productService: ProductService) {}

    @Get()
    async getAllProducts(@Query() query: ExpressQuery, @Res() res: Response): Promise<Product[]> {
        return this.productService.findAll(query, res)
    }

    @Post()
    async createProduct(
        @Body()
        product: Product,
        @Res() res: Response
    ): Promise<Product> {
        return this.productService.create(product, res)
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id: string,
        @Res() res: Response
    ): Promise<Product> {
        return this.productService.findById(id, res);
    }

    @Put(':id')
    async updateProduct(
        @Param('id')
        id: string,
        @Body()
        product: UpdateProductDto,
        @Res() res: Response
    ): Promise<Product> {
        return this.productService.updateById(id, product, res)
    }

    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string,
        @Res() res: Response
    ): Promise<Product> {
        return this.productService.deleteById(id, res);
    }
}
