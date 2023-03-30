import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators';
import { CoursesService } from './courses.service';

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
    create(@Body() body) {
        return this.coursesService.create(body)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.coursesService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coursesService.remove(id);
    }
}
