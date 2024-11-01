// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './context/auth/encription/infrastructure/auth.controller';
import { AppService } from './app.service';
import { FirebaseService } from './context/auth/firebase/infrastructure/firebase.service';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
