import { IsString } from "class-validator";

export class UserPostReqDto{
    @IsString()
    name:string;

    @IsString()
    password:string;
}