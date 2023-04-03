import {Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';




@Injectable()
export class CoursesService {
    
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    findAll() {
        return this.courseRepository.find({
            relations: ['tags']
        });
    }

    findOne(id: string) {
        const course = this.courseRepository.findOne(id, {
            relations: ['tags']
        })

        if(!course) {
            throw new NotFoundException(`Course ID ${id} NOT FOUND`)};

        return course;
    }

    async create(createCourseDto: CreateCourseDto) {
        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.preloadtagByName(name))
        );
        const course = this.courseRepository.create({
            ...createCourseDto,
            tags
        })
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const tags = 
        updateCourseDto.tags && 
        (await Promise.all(
            updateCourseDto.tags.map((name) => this.preloadtagByName(name)),
        ));
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags,
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
        course.tags = tags;

        return this.courseRepository.save(course);
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne(id);

        if(!course) {
            throw new NotFoundException(`Course ID ${id} NOT FOUND`)
        }

        return this.courseRepository.remove(course);
    }

    private async preloadtagByName(name: string): Promise<Tag>{
        const tag = await this.tagRepository.findOne({name});

        if(tag) {
            return tag;
        }

        return this.tagRepository.create({ name });
    }


}
