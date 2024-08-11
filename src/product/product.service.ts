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

    async findAll(query: Query, response: Response): Promise<Product[]> {
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
            products,
            totalRecords: totalRecords.length
        });
        return [];
    }

    async create(product: Product, response: Response): Promise<Product> {
        const res = await this.productModel.create(product);
        response.send(res);
        return;
    }

    async findById(id: string, response: Response): Promise<Product> {
        
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Please provide valid id');
        }

        const res = await this.productModel.findById(id);

        if (!res) {
            throw new NotFoundException('Product Not Found');
        }

        response.send(res);

        return;
    }

    async updateById(id: string, product: Product, response: Response): Promise<Product> {
        const res = await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
            runValidators: true
        });

        response.send(res);

        return;
    }

    async deleteById(id: string, response: Response): Promise<Product> {
        const res = await this.productModel.findByIdAndDelete(id);

        response.send(res);

        return;
    }
}
