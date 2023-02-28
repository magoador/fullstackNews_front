import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/category");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
