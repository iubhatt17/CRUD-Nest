import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @IsString()
    @IsNotEmpty()
    readonly product_image_url: string
}