import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private tasks: TasksService){}

    @Get()
    list(@Req() req:any){
        return this.tasks.list(req.user.userId);
    }

    @Post()
    create(@Req() req:any , @Body() dto: CreateTaskDto){
        return this.tasks.create(req.user.userId, dto);
    }

    @Patch(':id')
update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasks.update(req.user.userId, Number(id), dto);
}

@Delete(':id')
remove(@Req() req: any, @Param('id') id: string){
    return this.tasks.remove(req.user.userId,Number(id));
}
}
