import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  uid: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

const initialState: UserState = {
  email: null,
  uid: null,
  firstName: null,
  lastName: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        email: string | null;
        uid: string | null;
        firstName?: string | null;
        lastName?: string | null;
      }>
    ) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
