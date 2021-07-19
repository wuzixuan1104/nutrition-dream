import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JKObject } from 'data/interface/common';

export type ApiErrorLog = {
  payload: JKObject;
  jkApiName: string;
};

export type LogState = {
  jkApi?: {
    error?: ApiErrorLog
  }
};

export const LogSlice = createSlice({
  name: 'logReducer',
  initialState: <LogState> {
    jkApi: {
      error: {}
    }
  },
  reducers: {
    errorLog(state, action: PayloadAction<ApiErrorLog>) {
      state.jkApi.error = action?.payload;
    },
  },
});

type TPageState = {
  [key: string]: ReturnType<typeof LogSlice.reducer>;
};

/** action */
export const logAction = LogSlice.actions;

/** reducer */
export const logReducer = LogSlice.reducer;

/** selector */
export const logSelector = {
  jkApiError: (state: TPageState): ApiErrorLog => state[LogSlice.name]?.jkApi?.error,
};


