import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	email: string | null;
	uid: string | null;
}

const initialState: UserState = {
	email: null,
	uid: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{ email: string | null; uid: string | null }>
		) => {
			state.email = action.payload.email;
			state.uid = action.payload.uid;
		},
	},
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
