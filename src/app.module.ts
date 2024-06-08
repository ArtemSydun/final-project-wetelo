import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { ConfigModule } from '@nestjs/config';
// import User from './database/models/users';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mailer/mail.module';
import { PostsModule } from './modules/posts/posts.module';
// import PostModel from './database/models/posts';
import { SequelizeConnectionModule } from './database/config/sequelize.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    SequelizeConnectionModule,
    MailModule,
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
