import { ApiProperty } from '@nestjs/swagger';
import { GenericResponseDto } from './generics/generic-response.dto';

export class FeatureResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdBy: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export type FeatureResponseWrapper = GenericResponseDto<FeatureResponseDto>;
export type FeaturesResponseWrapper = GenericResponseDto<FeatureResponseDto[]>;