import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, createUserWithEmailAndPassword } from "@src/config/Firebase";

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const createUser = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: ValidationErrors }
>(
  "user/createUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    console.log("email", email);
    console.log("password", password);
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userAuth", userAuth);
      return userAuth.user.uid;
    } catch (err) {
      console.log("err createUser", err);
      return rejectWithValue(err);
    }
  }
);
