import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCasesModule } from './use-cases/use-cases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './use-cases/features/users/entities/user.entity';
import { DocumentEntity } from './use-cases/features/documents/entities/document.entity';

@Module({
  imports: [
    UseCasesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'my-dropbox',
      entities: [UserEntity, DocumentEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
