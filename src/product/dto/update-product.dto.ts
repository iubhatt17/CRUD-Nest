import { IsString, IsNumber, IsOptional } from "class-validator"


export class UpdateProductDto {

    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly description: string
    
    @IsOptional()
    @IsNumber()
    readonly price: number
    
    @IsOptional()
    @IsString()
    readonly product_image_url: string
}