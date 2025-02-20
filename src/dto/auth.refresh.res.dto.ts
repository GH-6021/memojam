import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthRefreshResDto{
    @ApiProperty({example:'adsfqwr',description:'새로운 액세스토큰'})
    @IsString()
    newAccessToken:string;
}