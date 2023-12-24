import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

class ProductUpdateUserCart {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdateUserCart {
  @IsNotEmpty()
  product: ProductUpdateUserCart;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}
