import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';


@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) {}

    
    @Get()
    listAll() {
        return this.coursesService.findAll()
    }
    

    @Get(':id')
    getId(@Param('id') id: string) {
        return this.coursesService.findOne(id);
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updaateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updaateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coursesService.remove(id);
    }
}
