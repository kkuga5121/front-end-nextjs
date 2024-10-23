// store/userSlice.ts
import { IUser } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  // You can add more fields if necessary
}

interface UserState {
  user: User | null; // Initially, the user is null
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Set the user data
    },
    clearUser: (state) => {
      state.user = null; // Clear the user data
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
