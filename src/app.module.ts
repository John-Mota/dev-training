import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ CoursesModule, ConfigModule.forRoot() ,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'cursonestjs',
    autoLoadEntities: true,
    synchronize: true,
    entities: []
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
