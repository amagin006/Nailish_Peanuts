import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User } from "@src/api/types";
import { RootState } from "@src/store";
import { createUser, userLoginWithPass } from "@src/store/user/api";

export interface UserState {
  user: User;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: {
    uid: null,
  },
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    confirmedError: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        console.log("createUser.pending");
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("createUser.fulfilled acton", action);
        state.user.uid = action.payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.status = "failed";
        console.log("createUser.rejected");
      })
      .addCase(userLoginWithPass.pending, (state) => {
        state.status = "loading";
        console.log("userLoginWithPass.pending action");
      })
      .addCase(userLoginWithPass.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("userLoginWithPass.fulfilled action", action);
        state.user.uid = action.payload;
      })
      .addCase(userLoginWithPass.rejected, (state) => {
        state.status = "failed";
        console.log("userLoginWithPass.rejected");
      });
  },
});

export const { logout, setUser, confirmedError } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export const userUid = (state: RootState) => state.user.user.uid;

export default userSlice.reducer;
