import { IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum AttachmentFolder {
  PLANOS            = 'PLANOS',
  DOCUMENTOS_LEGALES = 'DOCUMENTOS_LEGALES',
  INFORMES          = 'INFORMES',
  OTROS             = 'OTROS',
}

export class UploadAttachmentDto {
  /**
   * Carpeta destino del documento dentro del expediente.
   * - PLANOS: Planos arquitectónicos / técnicos
   * - DOCUMENTOS_LEGALES: Escritura, cédula, título de propiedad
   * - INFORMES: Informes técnicos, de inspección
   * - OTROS: Cualquier otro documento de soporte
   */
  @ApiProperty({
    enum: AttachmentFolder,
    example: AttachmentFolder.PLANOS,
    description: 'Carpeta del expediente donde se archiva el documento.',
  })
  @IsEnum(AttachmentFolder)
  folder: AttachmentFolder;

  @ApiPropertyOptional({
    example: 'Plano de implantación — Planta baja',
    description: 'Nombre descriptivo del documento. Si se omite se usa el nombre original del archivo.',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
