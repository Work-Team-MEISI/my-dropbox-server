import { Module } from '@nestjs/common';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { ProfileModule } from './features/profile/profile.module';

@Module({
  imports: [AuthenticationModule, ProfileModule],
  exports: [],
})
export class UsersModule {}
