import { createSlice } from '@reduxjs/toolkit';

import {
  fetchContacts,
  deleteContact,
  addContact,
  // updateContact,
} from '../contacts/operations';

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id,
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
  // .addCase(updateContact.pending, state => {
  //   state.loading = true;
  //   state.error = null;
  // })
  // .addCase(updateContact.fulfilled, (state, action) => {
  //   const index = state.items.findIndex(
  //     item => item.id === action.payload.id,
  //   );
  //   if (index !== -1) {
  //     state.items[index] = action.payload;
  //   }
  //   state.loading = false;
  //   state.error = null;
  // })
  // .addCase(updateContact.rejected, (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // }),
});

export const contactsReducer = contactsSlice.reducer;
