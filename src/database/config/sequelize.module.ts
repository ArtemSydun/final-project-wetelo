import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/database/models/users';
import Post from '../models/posts';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Post],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class SequelizeConnectionModule {}
