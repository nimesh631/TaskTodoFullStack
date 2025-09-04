import api from "../api/axios";

export type Task = {
    id:number;
    title: string;
    completed: boolean;
    user: {
        id: number;
        email: string;
    };
};

export const listTasks = async ():Promise<Task[]> => {
    const res = await api.get<Task[]>("/tasks");
    return res.data;
}

export const createTask = async (title: string): Promise<Task> => {
    const res = await api.post<Task>("/tasks",{title});
    return res.data;
}

export const taskUpdate = async (id: number, updates: Partial<Pick<Task,"title" | "completed">>):Promise<Task> => {
    const res = await api.patch<Task>(`/tasks/${id}`,updates);
    return res.data;
}

export const taskDelete = async (id:number) : Promise<{deleted: boolean}> => {
    const res = await api.delete<{deleted: boolean}>(`/tasks/${id}`);
    return res.data;
}
