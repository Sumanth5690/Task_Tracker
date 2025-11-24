import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await api.get("/users");
  return res.data;
});


export const addUser = createAsyncThunk(
  "users/addUser",
  async (data) => {
    const res = await api.post("/users", data); 
    return res.data; 
  }
);


const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

  
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

     
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload); 
      });
  }
});

// -----------------------------
export const selectAllUsers = (state) => state.users.items;
export default usersSlice.reducer;
