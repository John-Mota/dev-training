import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly appService: AppService) {}

    @Get()
    getOla(): string {
        return this.appService.getOla();
    }

    @Get(':id')
    getId(@Param('id') id: string): string{
        return `Curso ${id}`;
    }

    @Post()
    create(@Body('description') body) {
        return body;
    }
}
