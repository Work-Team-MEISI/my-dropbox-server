import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserEntity } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({ secret: 'secret' }),
  ],
})
export class AuthenticationModule {}
