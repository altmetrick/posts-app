import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = [
  { id: '0', name: 'Jack Jackson' },
  { id: '1', name: 'Nick Night' },
  { id: '2', name: 'Edd Brown' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

//Selectors
export const selectAllUsers = (state: RootState) => state.users;

export const usersReducer = usersSlice.reducer;
