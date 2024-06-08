import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mailer/mail.module';
import { PostsModule } from './modules/posts/posts.module';
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
