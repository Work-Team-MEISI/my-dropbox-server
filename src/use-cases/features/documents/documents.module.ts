import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentEntity } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [DocumentsService],
  controllers: [DocumentsController],
  imports: [
    TypeOrmModule.forFeature([DocumentEntity]),
    JwtModule.register({ secret: 'secret' }),
  ],
})
export class DocumentsModule {}
