import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity/task.entity';
import { User } from 'src/auth/user.entity/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasks: Repository<Task>,
        @InjectRepository(User) private users: Repository<User>,
    ){}

    async list(userId: number){
        const tasks = await this.tasks.find({where: {user:{id:userId}}, order: {id:'DESC'},relations:['user'],});

        return tasks.map(task => ({
            id:task.id,
            title: task.title,
            completed: task.completed,
            user: {id: task.user.id, email: task.user.email},
        }));

    }

    async create(userId: number, dto:CreateTaskDto){
        const user = await this.users.findOne({where: {id: userId }});
        if(!user) throw new Error('User not found');

        const task = this.tasks.create({title: dto.title, user});
        const savedTask = await this.tasks.save(task);

        return {
        id: savedTask.id,
        title: savedTask.title,
        completed: savedTask.completed,
        user: { id: user.id, email: user.email },
        }
    }

   async update(userId: number, id: number, dto: UpdateTaskDto) {
    const task = await this.tasks.findOne({
        where: { id, user: { id: userId } },
        relations: ['user'], // load the user relation
    });

    if (!task) throw new NotFoundException('Task not found');

    Object.assign(task, dto);

    const updatedTask = await this.tasks.save(task);

    return {
        id: updatedTask.id,
        title: updatedTask.title,
        completed: updatedTask.completed,
        user: { id: updatedTask.user.id, email: updatedTask.user.email }, // now safe
    };
}


    async remove(userId: number, id: number){
        const task = await this.tasks.findOne({where:{ id, user:{id: userId}}});
        if(!task) throw new NotFoundException('Task not Found');
        await this.tasks.remove(task);
        return {deleted: true};
    }
}
