import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeatureDTO {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  updatedBy: number;
}
