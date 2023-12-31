import { IsString, IsNotEmpty } from 'class-validator';

class OrderAddress {
  @IsString()
  comment: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class CheckoutOrder{
  @IsNotEmpty()
  address: OrderAddress;
}
