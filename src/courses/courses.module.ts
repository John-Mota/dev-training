import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tags.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [ DatabaseModule, TypeOrmModule.forFeature([Course, Tag])],
    controllers: [ CoursesController],
    providers: [ CoursesService]
})
export class CoursesModule {}
