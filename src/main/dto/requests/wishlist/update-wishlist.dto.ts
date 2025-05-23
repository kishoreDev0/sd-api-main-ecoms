import { ApiProperty } from '@nestjs/swagger';

export class UpdateWishlistDTO {
  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty()
  updatedBy: number;
}
