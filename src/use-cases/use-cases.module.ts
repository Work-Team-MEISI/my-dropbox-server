import { Module } from '@nestjs/common';
import { FilesModule } from './features/files/files.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [FilesModule, UsersModule],
  exports: [],
})
export class UseCasesModule {}
