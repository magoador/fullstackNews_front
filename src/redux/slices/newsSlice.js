import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

export const fetchNews = createAsyncThunk("news/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/news");
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
      })
  },
});

export default newsSlice.reducer;
