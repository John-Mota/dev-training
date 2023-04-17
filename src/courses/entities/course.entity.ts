import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags.entity";

import { v4 as uuidv4} from 'uuid'

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @JoinTable({name: 'courses_tags'})
    @ManyToMany( () => Tag, (tag) => tag.courses, {
        cascade: true
    })

    tags: Tag[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @BeforeInsert()
    generatedId(){
        if (this.id){
            return
        }

        this.id = uuidv4()
    }
}