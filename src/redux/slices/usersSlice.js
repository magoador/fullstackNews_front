import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginUser: {},
    users: []
}

export const fetchUsers = createAsyncThunk('users/fetch', async (_, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/users")
        return await res.json()
    } catch(err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const addUser = createAsyncThunk('user/add', async ({firstName, lastName, login, password}, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/user", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                firstName,
                lastName,
                login,
                password
            })
        })
        return res.json()
    } catch(err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.users.push(action.payload)
        })
    }
})

export default usersSlice.reducer