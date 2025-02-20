import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthRefreshReqDto{
    @ApiProperty({example:'zcxvfdsa',description:'refresh 토큰'})
    @IsString()
    refreshToken:string;
}