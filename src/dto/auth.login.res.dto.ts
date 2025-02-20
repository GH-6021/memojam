import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class authLoginResDto{
    @IsString()
    @ApiProperty({example:'asdf',description:'accessToken'})
    accessToken?: string;

    @IsString()
    @ApiProperty({example:'qwer',description:'refreshToken'})
    refreshToken?: string;
}