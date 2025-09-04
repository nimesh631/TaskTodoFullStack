import { useEffect, useState } from "react";
import { listTasks } from "../services/task.service";
import { createTask } from "../services/task.service";
import { taskUpdate } from "../services/task.service";
import { taskDelete } from "../services/task.service";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState<{ id: number; title: string ; completed:boolean; user:{id:number, email: string}}[]>([]);
  const [title, setTitle] = useState("");
  const [user,setUser] = useState<{id:number; email: string} | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await listTasks(); 
      setTasks(data);
      if(data.length > 0) setUser(data[0].user);
    } catch (err) {
      console.error(err);
      setTasks([]);
      setUser(null);
    }
  };

  const addTask = async () => {
    if (!title) return;
    try {
      await createTask(title);
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id: number, newTitle: string) => {
    try{
  await taskUpdate(id, { title: newTitle });
  fetchTasks();
}catch(err){
      console.error(err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskDelete(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = async (id: number, completed: boolean)=>{
    await taskUpdate(id,{completed});
    fetchTasks();
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      {user && <h1 className="text-xl  mb-2 text-blue-600 font-bold text-right">{user.email}</h1>}
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>
      <div className="mb-4 flex">
        <input
          className="border p-2 flex-1"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="ml-2 bg-green-500 text-white px-4 rounded hover:text-black"
        >
          Add
        </button>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={deleteTask} onUpdate={updateTask} onToggleCompleted = {toggleCompleted}  />
        ))
      ) : (
        <p className="text-gray-500">No tasks yet.</p>
      )}
    </div>
  );
}
