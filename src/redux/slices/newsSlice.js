import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  currentNews: {},
  addNewsMessage: "",
  addNewsSuccess: false,
};

export const fetchNews = createAsyncThunk("news/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/news");
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const addNews = createAsyncThunk(
  "news/add",
  async ({ img, name, description, category }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().users.token}`,
        },
        body: JSON.stringify({
          img,
          name,
          description,
          category,
        }),
      });
      const addedNews = await res.json();
      if (addedNews.err) {
        return thunkAPI.rejectWithValue(addedNews.err);
      }
      return addedNews;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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

export const getNewsById = createAsyncThunk(
  "news/getNewsById",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/news/${id}`);
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
            news = action.payload;
          }
          return news;
        });
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.news.push(action.payload);
        state.addNewsMessage = "Вы успешно добавили новость!";
        state.addNewsSuccess = true;
      })
      .addCase(addNews.rejected, (state, action) => {
        state.addNewsMessage = action.payload;
        state.addNewsSuccess = false;
      })
      .addCase(getNewsById.fulfilled, (state, action) => {
        state.currentNews = action.payload
      })
  },
});

export default newsSlice.reducer;
