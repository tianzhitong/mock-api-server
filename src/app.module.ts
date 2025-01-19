import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockModule } from './mock/mock.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MockModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
