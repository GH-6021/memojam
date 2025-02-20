import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginReqDto{
    @ApiProperty({example:'1',description:'사용자 고유 id'})
    @IsNumber()
    id:number;

    @ApiProperty({example:'123',description:'사용자 비밀번호'})
    @IsString()
    password:string;
}