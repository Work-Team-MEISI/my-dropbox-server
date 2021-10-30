import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentEntity } from './entity/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  providers: [DocumentsService],
  controllers: [DocumentsController],
  imports: [
    TypeOrmModule.forFeature([DocumentEntity])
  ]
})
export class DocumentsModule {}
