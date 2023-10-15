import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: any;
  loggedIn: boolean;
}

const initialState: UserState = {
  userData: null,
  loggedIn: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userData = action.payload;
      state.loggedIn = true;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
