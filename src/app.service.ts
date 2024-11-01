// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { FirebaseService } from './context/auth/firebase/infrastructure/firebase.service';

@Injectable()
export class AppService {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Método para obtener todos los documentos de una colección usando FirebaseService
  async getCollectionData(collection: string) {
    return await this.firebaseService.getCollectionData(collection);
  }

  // Método para obtener un documento específico dentro de una colección usando FirebaseService
  async getDocumentData(collection: string, docId: string) {
    return await this.firebaseService.getDocumentData(collection, docId);
  }
}
