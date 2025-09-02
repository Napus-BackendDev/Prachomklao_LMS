import { PartialType } from "@nestjs/mapped-types";
import { CreatePretestDto } from "./create-pretest.dto";


export class UpdatePretestDto extends PartialType(CreatePretestDto) {}