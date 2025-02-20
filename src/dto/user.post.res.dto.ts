import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UserPostResDto{
    @ApiProperty({example:'1', description:'사용자 고유 id'})
    @IsNumber()
    id:number;

    @ApiProperty({example:'오리', description:'사용자 이름'})
    @IsString()
    name:string;
}