// src/contexts/auth/dto/create-message.dto.ts
import { IsString, IsArray, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  contraseña: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string ;
  @IsDateString()
  @IsNotEmpty()
   hora_envio:string;

}
