import { IsNumber, IsString } from "class-validator";

export class AuthLoginDto{
    @IsNumber()
    id:number;

    @IsString()
    password:string;
}