import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  customers: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const baseUrl = "http://localhost:5000";
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/customers`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.customers = action.payload.data;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default customersSlice.reducer;
