import { IsString } from "class-validator";

export class MemoPostReqDto{
    @IsString()
    title: string;
    
    @IsString()
    content: string;
}