import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loginError: "",
  registrationError: "",
  isAdmin: true,
  signUp: false,
  loggedUser: null,
  token: localStorage.getItem("token"),
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/users");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/add",
  async ({ firstName, lastName, login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          login,
          password,
        }),
      });
      const addedUser = await res.json();
      if (addedUser.error) {
        return thunkAPI.rejectWithValue(addedUser.error);
      }
      return addedUser;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const token = await res.json();
      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registrationError: (state, action) => {
      state.registrationError = action.payload;
    },
    loginError: (state, action) => {
      state.loginError = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        if (state.token) {
          function parseJwt(token) {
            let base64Url = token.split(".")[1];
            let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            let jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );
            return JSON.parse(jsonPayload);
          }
          state.loggedUser = parseJwt(state.token);
          if (state.loggedUser.login === "admin") {
            state.isAdmin = true;
          } else {
            state.isAdmin = false;
          }
        } else {
          state.isAdmin = false;
        }
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.signUp = true;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.registrationError = action.payload;
        state.signUp = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        function parseJwt(token) {
          let base64Url = token.split(".")[1];
          let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          let jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          return JSON.parse(jsonPayload);
        }
        state.loggedUser = parseJwt(state.token);
        if (state.loggedUser.login === "admin") {
          state.isAdmin = true;
        } else {
          state.isAdmin = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.payload;
      });
  },
});

export const { registrationError, clearToken, loginError } = usersSlice.actions;

export default usersSlice.reducer;
