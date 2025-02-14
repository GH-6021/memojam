import { PartialType } from "@nestjs/mapped-types";
import { MemoPostReqDto } from "./memo.post.req.dto";
export class MemoUpdateDto extends PartialType(MemoPostReqDto) {}