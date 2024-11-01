// src/contexts/auth/auth.controller.ts
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { FirebaseService } from '../../firebase/infrastructure/firebase.service';
import { CreateMessageDto } from '../../../chat/develop/infrastructure/create-message.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('firebase/:collection')
  async getCollectionData(@Param('collection') collection: string) {
    return await this.firebaseService.getCollectionData(collection);
  }

  // Ruta para crear un nuevo mensaje
  @Post('firebase/:collection/messages')
  async createMessage(
    @Param('collection') collection: string,
    @Body() message: CreateMessageDto
  ) {
    return await this.firebaseService.createMessage(collection, message);
  }

  // Ruta para eliminar un documento por ID en una colección específica
  @Delete('firebase/:collection/:docId')
  async deleteDocument(
    @Param('collection') collection: string,
    @Param('docId') docId: string
  ) {
    return await this.firebaseService.deleteDataCondi(collection, docId);
  }
}

