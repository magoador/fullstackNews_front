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

export const addComment = createAsyncThunk(
  "news/addComment",
  async ({ newsId, text, userId }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:4000/news/${newsId}/add/comment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${thunkAPI.getState().users.token}`,
          },
          body: JSON.stringify({
            user: userId,
            text: text,
          }),
        }
      );
      return res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.news.map((news) => {
          if (news._id === action.payload._id) {
            news = action.payload
          }
          return news;
        });
      });
  },
});

export default newsSlice.reducer;
