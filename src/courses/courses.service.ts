import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Course } from './entities/course.entity';




@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: "Fundamentos do framwork Nest JS",
            description: "Curso Fundamentos do framwork Nest JS",
            tags: ["nestjs", "nodejs", "freamwork"]
        },
        {
            id: 2,
            name: "Fundamentos de HTML",
            description: "Curso Fundamentos de HTML",
            tags: ["htmls", "frontend", "marcação"]
        },
        {
            id: 3,
            name: "Fundamentos de CSS",
            description: "Curso Fundamentos de CSS",
            tags: ["nestjs", "frontend", "style"]
        }
    ];

    findAll() {
        return this.courses;
    }

    findOne(id: string) {
        const course = this.courses.find((course: Course) => course.id === Number(id));

        if(!course) {
            throw new HttpException(
                `Course ID ${id} NOT FOUND`, 
                HttpStatus.NOT_FOUND
            
            )};

        return course;
    }

    create(createCourseDto: any) {
        this.courses.push(createCourseDto);
    }

    update(id: string, updateCourseDto: any) {
        const indexCourse = this.courses.findIndex(course => course.id === Number(id));
        this.courses[indexCourse] = updateCourseDto;
    }

    remove(id: string) {
        const indexCourse = this.courses.findIndex(course => course.id === Number(id));

        if(indexCourse >= 0) {
            this.courses.splice(indexCourse, 1);
        }
    }


}
