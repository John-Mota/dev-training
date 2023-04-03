import {Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';




@Injectable()
export class CoursesService {
    
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    findAll() {
        return this.courseRepository.find();
    }

    findOne(id: string) {
        const course = this.courseRepository.findOne(id)

        if(!course) {
            throw new NotFoundException(`Course ID ${id} NOT FOUND`)};

        return course;
    }

    create(createCourseDto: CreateCourseDto) {
        const course = this.courseRepository.create(createCourseDto)
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRepository.preload({
            id: +id,
            ... updateCourseDto,
        });

        if(!course) {
            throw new NotFoundException(`Course ID ${id} NOT FOUND`)
        };

            if (typeof updateCourseDto.name !== 'string' ||
        typeof updateCourseDto.description !== 'string' ||
        !Array.isArray(updateCourseDto.tags) ||
        updateCourseDto.tags.some(tag => typeof tag !== 'string')) {
        throw new NotFoundException('Invalid data type for one or more properties')}


        course.name = updateCourseDto.name;
        course.description = updateCourseDto.description;
        course.tags = updateCourseDto.tags;

        return this.courseRepository.save(course);
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne(id);

        if(!course) {
            throw new NotFoundException(`Course ID ${id} NOT FOUND`)
        }

        return this.courseRepository.remove(course);
    }


}
