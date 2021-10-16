import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { ProfileModule } from './features/profile/profile.module';

@Module({
  imports: [
    AuthenticationModule,
    ProfileModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class UsersModule {}
