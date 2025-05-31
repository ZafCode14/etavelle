// store/pageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  year: '',
  month: '',
  currency: 'USD',
  projectName: '',
  rate: 0
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
    setRate: (state, action: PayloadAction<{rate: number}>) => {
      state.rate = action.payload.rate;
    }
  },
});

export const { setDateFilter, setCurrency, setProjectName, setRate } = pageSlice.actions;
export default pageSlice.reducer;