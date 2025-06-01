// store/pageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  year: '',
  month: '',
  currency: 'USD',
  projectName: '',
  rates: {}
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setDateFilter: (state, action: PayloadAction<{year: string, month: string}>) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
    },
    setCurrency: (state, action: PayloadAction<{currency: string}>) => {
      state.currency = action.payload.currency;
    },
    setProjectName: (state, action: PayloadAction<{projectName: string}>) => {
      state.projectName = action.payload.projectName;
    },
    setRates: (state, action: PayloadAction<{ [key: string]: number }>) => {
      state.rates = action.payload;
    }
  },
});

export const { setDateFilter, setCurrency, setProjectName, setRates } = pageSlice.actions;
export default pageSlice.reducer;