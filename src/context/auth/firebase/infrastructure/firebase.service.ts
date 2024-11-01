// src/contexts/auth/firebase/infrastructure/firebase.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateMessageDto } from '../../../chat/develop/infrastructure/create-message.dto';

@Injectable()
export class FirebaseService {
  private db: admin.firestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert('/Users/bernardopedrazas/Downloads/fideo-login-firebase-adminsdk-itrqs-8c492501fe.json'), // Usa tus credenciales aquí
      });
    }
    this.db = admin.firestore();
  }

 
  async getCollectionData(collection: string) {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  async getDocumentData(collection: string, docId: string) {
    const doc = await this.db.collection(collection).doc(docId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async createMessage(collection: string, message: CreateMessageDto) {
    const docRef = await this.db.collection(collection).add(message);
    return { id: docRef.id, ...message };
  }
  async deleteDataCondi(collection: string, docId: string) {
    const docRef = this.db.collection(collection).doc(docId);
    const doc = await docRef.get();
  
    if (doc.exists) {
      const data = doc.data();
      if (data && Object.keys(data).length < 20) { 
        await docRef.delete();
        return { id: docId, message: 'Documento eliminado con éxito' };
      } else {
        return { id: docId, message: 'Documento no cumple con el criterio de eliminación' };
      }
    } else {
      return { id: docId, message: 'Documento no encontrado' };
    }
  }
  
}
