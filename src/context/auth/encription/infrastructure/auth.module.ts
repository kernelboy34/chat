// src/contexts/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from '../infrastructure/auth.controller';
import { FirebaseService } from '../../firebase/infrastructure/firebase.service';

@Module({
  controllers: [AuthController],
  providers: [FirebaseService],
})
export class AuthModule {}
