import { useState } from "react";

type TaskProps = {
  task: { id: number; title: string; completed: boolean };
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
};

export default function TaskCard({
  task,
  onDelete,
  onUpdate,
  onToggleCompleted,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  const save = () => {
    if (newTitle.trim() === "") return;
    onUpdate(task.id, newTitle);
    setIsEditing(false);
  };

  const toggleCompleted = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    onToggleCompleted(task.id, newCompleted);
  };

  return (
    <div className="flex justify-between bg-gray-100 p-3 rounded mb-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleCompleted}
        className="w-5 h-5"
      />
      
      {isEditing ? (
        <input
          className="w-full border p-2 "
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span
          className={`text-xl font-serif p-2  ${
            completed ? "line-through text-blue-400" : "no-underline"
          }`}
        >
          {task.title}
        </span>
      )}
      <div className="flex gap-2 ml-2 ">
        {isEditing ? (
          <button
            onClick={save}
            className="bg-blue-500 p-2 rounded text-white hover:text-black"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-white p-2 rounded bg-blue-500 hover:text-black"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 p-2 rounded text-white hover:text-black"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
