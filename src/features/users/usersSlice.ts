import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
} as UsersInitialStateT;

//Thunks
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get(USERS_URL);
  return res.data;
});

//

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Array<UserT>>) => {
      return { users: action.payload, status: 'succeeded', error: null };
    });
  },
});

//Selectors
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUserById = (userId: string) => {
  return (state: RootState) => state.users.users.find((user) => user.id === Number(userId));
};
export const usersReducer = usersSlice.reducer;

//Types
interface UsersInitialStateT {
  users: Array<UserT>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | SerializedError;
}
const userExm = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};
type UserT = typeof userExm;
