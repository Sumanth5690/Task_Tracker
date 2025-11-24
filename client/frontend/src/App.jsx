import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        <header className="bg-white shadow mb-4">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Task Tracker
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 pb-8">
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
