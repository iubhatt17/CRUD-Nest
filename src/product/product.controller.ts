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

    /**
     * API Endpoint to get all the products with pagination and search
     * @param query 
     * @param res 
     * @returns 
     */
    @Get()
    async getAllProducts(@Query() query: ExpressQuery, @Res() res: Response): Promise<Product[]> {
        return this.productService.findAll(query, res)
    }

    /**
     * API Endpoint to store product data in DB
     * @param product 
     * @param res 
     * @returns 
     */
    @Post()
    async createProduct(
        @Body()
        product: Product,
        @Res() res: Response
    ): Promise<Product> {
        return this.productService.create(product, res)
    }

    /**
     * API Endpoint to get product by ID
     * @param id 
     * @param res 
     * @returns 
     */
    @Get(':id')
    async getProduct(
        @Param('id')
        id: string,
        @Res() res: Response
    ): Promise<Product> {
        return this.productService.findById(id, res);
    }

    /**
     * API Endpoint to update product data using ID
     * @param id 
     * @param product 
     * @param res 
     * @returns 
     */
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

    /**
     * API Endpoint to delete product using ID
     * @param id 
     * @param res 
     * @returns 
     */
    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string,
        @Res() res: Response
    ): Promise<Product> {
        return this.productService.deleteById(id, res);
    }
}
