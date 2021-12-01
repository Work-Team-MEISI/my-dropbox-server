import { ConsoleLogger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCasesModule } from './use-cases/use-cases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './use-cases/features/users/entities/user.entity';
import { DocumentEntity } from './use-cases/features/documents/entities/document.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as PostgressConnectionStringParser from "pg-connection-string";

require('dotenv').config();

const databaseUrl: string = process.env.DATABASE_URL;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);

@Module({
  imports: [
    UseCasesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: connectionOptions.host,
      port: Number(connectionOptions.port),  
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      synchronize: true,
      entities: [UserEntity, DocumentEntity],
      ssl: {
        rejectUnauthorized: false
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
