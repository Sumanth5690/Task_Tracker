import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import { updateTask, deleteTask } from "../features/tasks/tasksSlice.js";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTask = async () => {
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTask();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await dispatch(updateTask({ id, updates: { status: newStatus } }));
    setTask((prev) => ({ ...prev, status: newStatus }));
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(id));
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

 return (
  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-100">

    {/* Title + Delete Button */}
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {task.title}
        </h1>
        <p className="mt-1 text-gray-600 text-sm">
          {task.description || "No description"}
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 shadow"
      >
        Delete
      </button>
    </div>

    {/* Info Grid */}
    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">

      {/* Left Column (Details) */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Assignee:</span>{" "}
          <span className="text-indigo-600 font-medium">
            {task.assigneeId ? task.assigneeId.name : "Unassigned"}
          </span>
        </p>

        <p>
          <span className="font-semibold">Created:</span>{" "}
          {task.createdAt
            ? new Date(task.createdAt).toLocaleString()
            : "Unknown"}
        </p>

        {task.dueDate && (
          <p>
            <span className="font-semibold">Due Date:</span>{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Right Column (Status Dropdown) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>

        <select
          className="w-full rounded-lg border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>

    {/* Status Badge */}
    <div>
      <span
        className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium
          ${
            task.status === "done"
              ? "bg-green-100 text-green-800"
              : task.status === "in-progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-200 text-gray-700"
          }
        `}
      >
        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </span>
    </div>
  </div>
);

}
