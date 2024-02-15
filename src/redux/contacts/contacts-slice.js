import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContacts,
  deleteContacts,
} from './contacts-operartion';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter(({ id }) => id !== payload);
      })
      .addCase(deleteContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
      })
      .addCase(addContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  addContact,
  deleteContact,
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
  addContactsLoading,
  addContactsSuccess,
  addContactsError,
  deleteContactsLoading,
  deleteContactsSuccess,
  deleteContactsError,
} = contactsSlice.actions;
export default contactsSlice.reducer;
