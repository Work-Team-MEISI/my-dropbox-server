import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentEntity } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from '../users/features/profile/profile.module';
import { UserEntity } from '../users/entities/user.entity';
import { AuthenticationService } from '../users/features/authentication/authentication.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [DocumentsService, AuthenticationService],
  controllers: [DocumentsController],
  imports: [
    ProfileModule,
    TypeOrmModule.forFeature([DocumentEntity, UserEntity]),
    JwtModule.register({ secret: 'secret' }),
    MulterModule.register({ dest: './uploads' }),
  ],
})
export class DocumentsModule {}
