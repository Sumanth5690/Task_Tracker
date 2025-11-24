import { Link } from "react-router-dom";

export default function TaskCard({ task }) {
  const badge =
    task.status === "done"
      ? "bg-green-100 text-green-700"
      : task.status === "in-progress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <Link
      to={`/tasks/${task._id}`}
      className="bg-white rounded-xl shadow p-4 flex justify-between items-start hover:shadow-md transition"
    >
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {task.description || "No description"}
        </p>
        <div className="text-xs text-gray-500 mt-1">
          {task.assigneeId ? `Assignee: ${task.assigneeId.name}` : "Unassigned"}
        </div>
        {task.dueDate && (
          <div className="text-xs text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
      <span
        className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${badge}`}
      >
        {task.status}
      </span>
    </Link>
  );
}
