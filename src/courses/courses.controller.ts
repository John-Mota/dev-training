import { Controller, Get } from '@nestjs/common';
import path from 'path';
import { AppService } from 'src/app.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly appService: AppService) {}

    @Get('list')
    getOla(): string {
        return this.appService.getOla();
    }
}
