import { Module } from '@nestjs/common';
import { databaseProviders } from '../database.providers';
import { Tag } from 'src/courses/entities/tags.entity';
import { Course } from 'src/courses/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Tag]),
    
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
