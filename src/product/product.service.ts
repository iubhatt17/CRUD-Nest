import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Response } from 'express';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>
    ) {}

    /**
     * To get all the products from DB with pagination and search
     */
    async findAll(query: Query, response: Response): Promise<Product[]> {
        try {
            
        
            const resPerPage = 5;
            const currentPage = Number(query.page) || 1;
            const skip = resPerPage * (currentPage - 1);

            const keyword = query.keyword ? {
                $or: [
                    {
                        title: {
                            $regex: query.keyword,
                            $options: 'i'
                        }
                    }, {
                        description: {
                            $regex: query.keyword,
                            $options: 'i'
                        }
                    }
                ]
                
            } : {}

            const products = await this.productModel.find({...keyword}).limit(resPerPage).skip(skip);
            const totalRecords = await this.productModel.find({...keyword});
            
            response.send({
                status: 'success',
                products,
                totalRecords: totalRecords.length
            });
            return [];
        } catch (error) {
            console.log(error);
            response.send({
                status: 'error', message: error?.mesage
            })
            return ;
        }
    }

    /**
     * To add and store product record in DB
     */
    async create(product: Product, response: Response): Promise<Product> {
        try {
            const res = await this.productModel.create(product);
            response.send({
                status: 'success',
                res
            });
            return;
        } catch (error) {
            console.log(error);
            response.send({
                status: 'error', message: error?.mesage
            })
            return ;
        }
        
    }

    /**
     * To get product details by ID
     */
    async findById(id: string, response: Response): Promise<Product> {
        try {
            const isValidId = mongoose.isValidObjectId(id);

            if (!isValidId) {
                throw new BadRequestException('Please provide valid id');
            }

            const res = await this.productModel.findById(id);

            if (!res) {
                throw new NotFoundException('Product Not Found');
            }

            response.send({
                status: 'success',
                res
            });

            return;   
        } catch (error) {
            console.log(error);
            response.send({
                status: 'error', message: error?.mesage
            })
            return ;
        }
    }

    /**
     * To update product details by ID
     */
    async updateById(id: string, product: Product, response: Response): Promise<Product> {
        try {
            const res = await this.productModel.findByIdAndUpdate(id, product, {
                new: true,
                runValidators: true
            });

            if (!res) {
                throw new NotFoundException('Product Not Found');
            }
    
            response.send({
                status: 'success',
                res
            });
    
            return;
        } catch (error) {
            console.log(error);
            response.send({
                status: 'error', message: error?.mesage
            })
            return ;
        }
    }

    /**
     * To delete product by ID
     */
    async deleteById(id: string, response: Response): Promise<Product> {
        try {
            const res = await this.productModel.findByIdAndDelete(id);
            
            if (!res) {
                throw new NotFoundException('Product Not Found');
            }

            response.send({
                status: 'success',
                res
            });

            return;
        } catch (error) {
            console.log(error);
            response.send({
                status: 'error', message: error?.mesage
            })
            return ;
        }
    }
}
