import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators';
import { AppService } from 'src/app.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly appService: AppService) {}

    @Get()
    getOla(@Res() response): string {
        return this.appService.getOla();
    }

    @Get('list')
    listAll(@Res() response): string {
        return response.status(200).send('Listagem curso')
    }
    

    @Get(':id')
    getId(@Param('id') id: string): string{
        return `Curso ${id}`;
    }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    create(@Body('description') body) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `Atualização Curso ${id}`
    }

    @Delete(':id')
    remove(@Param('id') id: string): string{
        return `Curso ${id} Excluído`;
    }
}