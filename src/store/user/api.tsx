import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, createUserWithEmailAndPassword } from "@src/config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userAuth.user.uid;
    } catch (err) {
      console.log("err createUser", err);
      return rejectWithValue(err);
    }
  }
);

export const userLoginWithPass = createAsyncThunk(
  "user/userLoginWithPass",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      return userAuth.user.uid;
    } catch (err) {
      console.log("err userLoginWithPass", err);
      return rejectWithValue(err);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
    } catch (err) {
      console.log("err userLoginWithPass", err);
      return rejectWithValue(err);
    }
  }
);
