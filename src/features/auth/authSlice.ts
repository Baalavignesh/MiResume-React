import { createSlice } from "@reduxjs/toolkit";

interface authInitialState {
  accessToken: string;
  email: string;
  userInfo: IUserInfo;
}

const authInitialState = {
  accessToken: "",
  userInfo: {
    email: "",
    name: "",
    gender: "",
    skills: "",
    technologies: "",
    isComplete: "",
    experience: [],
    projects: [],
    education: [],
    certifications: [],
  },
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { setTokens } = authSlice.actions;

export default authSlice.reducer;
