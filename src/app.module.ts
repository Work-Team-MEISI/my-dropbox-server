import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCasesModule } from './use-cases/use-cases.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UseCasesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4320,
      username: 'admin',
      password: 'admin',
      database: 'my-dropbox',
      entities: ['./use-cases/features/**/entities/*.entity.ts'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
