import { IsEnum, IsString, IsNotEmpty, ValidateNested, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RequestType } from '../../common/enums/request-type.enum';

class PropertyDto {
  @ApiPropertyOptional({ example: '03-01-00-000-000' })
  @IsString()
  @IsOptional()
  cadastral_key?: string;

  @ApiProperty({ example: 'Canton Canar, Ecuador' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ example: 120 })
  @IsNumber()
  @IsOptional()
  area?: number;

  @ApiProperty({ example: 'URBAN' })
  @IsString()
  @IsNotEmpty()
  zone: string;
}

export class CreateRequestDto {
  @ApiProperty({ enum: RequestType, example: RequestType.CONSTRUCTION_PERMIT })
  @IsEnum(RequestType)
  request_type: RequestType;

  @ApiPropertyOptional({ example: '0900000000' })
  @IsString()
  @IsOptional()
  phone?: string;

  /**
   * UUID del ciudadano propietario del predio.
   * Requerido cuando quien crea la solicitud es un ARCHITECT.
   * Si el ciudadano crea la solicitud directamente, este campo se ignora
   * y se usa su propio `id`.
   */
  @ApiPropertyOptional({
    example: 'e3b0c442-98fc-1c14-9afb-f4c8996fb924',
    description:
      'UUID del ciudadano en cuyo nombre el profesional habilitado registra el trámite. ' +
      'Obligatorio cuando el rol del solicitante es ARCHITECT.',
  })
  @IsUUID()
  @IsOptional()
  citizen_id?: string;

  @ApiProperty({ type: PropertyDto })
  @ValidateNested()
  @Type(() => PropertyDto)
  property: PropertyDto;
}
