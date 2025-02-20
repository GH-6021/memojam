import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserPostReqDto{
    @ApiProperty({example:'오리',description:'사용자 이름'})
    @IsString()
    name:string;

    @ApiProperty({example:'123',description:'사용자 비밀번호'})
    @IsString()
    password:string;
}