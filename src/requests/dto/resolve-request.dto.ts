import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * ResolveRequestDto — Used by TECHNICIAN/SECRETARY/FINANCIAL to close a request.
 * The payment amount is NO LONGER entered manually: it is automatically
 * calculated by FeeRulesService based on the property zone and area.
 */
export class ResolveRequestDto {
  @ApiPropertyOptional({
    example: true,
    description: 'True to approve and generate payment. False to reject.',
  })
  @IsBoolean()
  @IsOptional()
  approved?: boolean;

  @ApiProperty({ example: 'Favorable technical resolution. System will calculate payment.' })
  @IsString()
  comments: string;
}
