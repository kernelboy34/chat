// src/app.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { FirebaseService } from './context/auth/firebase/infrastructure/firebase.service';

@Controller()
export class AppController {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Ruta para obtener todos los documentos de una colección desde el AppController
  @Get('firebase/:collection')
  async getCollectionData(@Param('collection') collection: string) {
    return await this.firebaseService.getCollectionData(collection);
  }

  // Ruta para obtener un documento específico dentro de una colección desde el AppController
  @Get('firebase/:collection/:docId')
  async getDocumentData(
    @Param('collection') collection: string,
    @Param('docId') docId: string,
  ) {
    return await this.firebaseService.getDocumentData(collection, docId);
  }
}
