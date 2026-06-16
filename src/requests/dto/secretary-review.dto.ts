import { IsBoolean, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * SecretaryReviewDto — Cuerpo de la decisión de la secretaría sobre un trámite.
 *
 * Flujo:
 *  - signature_validated=false  → Error 422: no se puede avanzar sin firma válida del profesional.
 *  - approved=false             → Estado OBSERVED; el expediente regresa al ciudadano/profesional.
 *  - approved=true + sig OK     → Estado PENDING_TECHNICIAN.
 */
export class SecretaryReviewDto {
  /**
   * Indica que la secretaria verificó manualmente que el PDF del profesional
   * habilitado contiene una firma digital válida.
   * Si es `false` la solicitud se rechaza con HTTP 422.
   */
  @ApiProperty({
    example: true,
    description:
      'Resultado de la verificación manual de la firma digital del profesional en el PDF adjunto. ' +
      'Debe ser true para que el expediente pueda avanzar.',
  })
  @IsBoolean()
  signature_validated: boolean;

  /**
   * Decisión final de la secretaría:
   * - true  → aprueba el paso a revisión técnica (PENDING_TECHNICIAN)
   * - false → observa el expediente (OBSERVED), que regresa al responsable para correcciones
   */
  @ApiProperty({
    example: true,
    description: 'true: aprobar y pasar a técnico | false: observar y devolver para correcciones.',
  })
  @IsBoolean()
  approved: boolean;

  @ApiPropertyOptional({
    example: 'Documentación completa. Firma validada. Se remite a inspección técnica.',
    description: 'Observaciones o motivo del rechazo.',
  })
  @IsString()
  @IsOptional()
  remarks?: string;
}
