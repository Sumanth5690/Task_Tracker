import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { api } from "../../api";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await api.get("/tasks");
  return res.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const res = await api.post("/tasks", taskData);
  return res.data;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }) => {
    const res = await api.patch(`/tasks/${id}`, updates);
    return res.data;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    filter: "all", 
    currentUserId: null 
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  }
});

export const { setFilter, setCurrentUserId } = tasksSlice.actions;


export const selectAllTasks = (state) => state.tasks.items;
export const selectFilter = (state) => state.tasks.filter;
export const selectCurrentUserId = (state) => state.tasks.currentUserId;


export const selectVisibleTasks = createSelector(
  [selectAllTasks, selectFilter, selectCurrentUserId],
  (tasks, filter, currentUserId) => {
    if (filter === "completed") {
      return tasks.filter((t) => t.status === "done");
    }
    if (filter === "mine" && currentUserId) {
      return tasks.filter((t) => t.assigneeId?._id === currentUserId);
    }
    return tasks;
  }
);


export const makeSelectTasksByAssignee = (assigneeId) =>
  createSelector([selectAllTasks], (tasks) =>
    tasks.filter((t) => t.assigneeId?._id === assigneeId)
  );

export default tasksSlice.reducer;
