import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
  todo: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

//get user todo
export const getUserTodo = createAsyncThunk(
  `todo/getUserTodo`,
  async (id, thunkAPI) => {
    try {
      return await todoService.getUserTodo(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get tracker details
export const getAllTodo = createAsyncThunk(
  `todo/getAllTodo`,
  async (_, thunkAPI) => {
    try {
      return await todoService.getAllTodo();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//create new task
export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (data, thunkAPI) => {
    try {
      return await todoService.createTodo(data);
    } catch (error) {
      (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      const message = console.log(error.response.data);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update todo
export const updateTodo = createAsyncThunk(
  `todo/updateTodo`,
  async (id, thunkAPI) => {
    try {
      return await todoService.updateTodo(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id, thunkAPI) => {
    try {
      return await todoService.deleteTodo(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.todo = [action.payload.todo, ...state.todo];
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });

    //get user todo
    builder.addCase(getUserTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.todo = action.payload;
    });
    builder.addCase(getUserTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    //get all todo
    builder.addCase(getAllTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.todo = action.payload;
    });
    builder.addCase(getAllTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    //update todo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.todo = action.payload;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    //delete todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.todo = state.todo.filter((todo) => todo._id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
