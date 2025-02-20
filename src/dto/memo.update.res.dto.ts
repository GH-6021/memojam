import { PartialType } from "@nestjs/mapped-types";
import { MemoPostReqDto } from "./memo.post.req.dto";
import { ApiProperty } from "@nestjs/swagger";

export class MemoUpdateDto extends PartialType(MemoPostReqDto) {
    @ApiProperty({example:'제목',description:'제목'})
    title?: string;
    
    @ApiProperty({example:'내용',description:'내용'})
    content?: string;
}