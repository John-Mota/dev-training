import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';

@Module({
    imports: [],
    controllers: [ CoursesController],
    providers: [ CoursesService]
})
export class CoursesModule {}
