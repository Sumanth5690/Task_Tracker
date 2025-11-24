import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  selectVisibleTasks,
  setFilter,
  selectFilter,
  setCurrentUserId
} from "../features/tasks/tasksSlice";
import { fetchUsers, selectAllUsers } from "../features/users/usersSlice";
import AddTaskForm from "../components/AddTaskForm";
import TaskCard from "../components/TaskCard";

export default function TaskListPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectVisibleTasks);
  const filter = useSelector(selectFilter);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  // For demo: assume current user is first user
  useEffect(() => {
    if (users.length > 0) {
      dispatch(setCurrentUserId(users[0]._id));
    }
  }, [users, dispatch]);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex justify-between items-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {[
            { id: "all", label: "All" },
            { id: "mine", label: "Assigned to me" },
            { id: "completed", label: "Completed" }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`px-4 py-2 text-sm font-medium border border-gray-200 ${
                filter === f.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

     
      {filter !== "completed" && <AddTaskForm />}


      <div className="grid gap-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm">No tasks found.</p>
        )}
      </div>
    </div>
  );
}
