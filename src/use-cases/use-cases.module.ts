import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { DocumentsModule } from './features/documents/documents.module';

@Module({
  imports: [UsersModule, DocumentsModule],
  exports: [],
})
export class UseCasesModule {}
