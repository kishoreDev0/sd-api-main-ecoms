import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleModule } from './main/google-sign-in/google.module';
import { GoogleStrategy } from './main/google-sign-in/google.strategy';
import { DatabaseModule } from './main/modules/database.module';
import { RoleModule } from './main/modules/role.module';
import { LoggerModule } from './main/modules/logger.module';
import { UserSessionModule } from './main/modules/user-session.module';
import { UserModule } from './main/modules/user.module';


@Module({
  imports: [
    DatabaseModule,
    RoleModule,
    LoggerModule,
    UserSessionModule,
    GoogleModule,
    UserModule,

  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
