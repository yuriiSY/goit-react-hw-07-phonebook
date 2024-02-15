import * as contactsApi from '../../api/contacts-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await contactsApi.requestContacts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchContacts = () => {
//   const func = async dispatch => {
//     try {
//       dispatch(fetchContactsLoading());
//       const data = await contactsApi.requestContacts();
//       dispatch(fetchContactsSuccess(data));
//     } catch (error) {
//       dispatch(fetchContactsError(error.message));
//     }
//   };

//   return func;
// };

// export const addContacts = body => {
//   const func = async dispatch => {
//     try {
//       dispatch(addContactsLoading());
//       const data = await contactsApi.requestAddContacts(body);
//       dispatch(addContactsSuccess(data));
//     } catch (error) {
//       dispatch(addContactsError(error.message));
//     }
//   };
//   return func;
// };

export const addContacts = createAsyncThunk(
  'contacts/add',
  async (body, { rejectWithValue }) => {
    try {
      const data = await contactsApi.requestAddContacts(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: ({ name }, { getState }) => {
      const { contacts } = getState();
      console.log(contacts);
      const nameNormalized = name.toLowerCase();

      const duplicate = contacts.items.find(item => {
        const currentNameNormalize = item.name.toLowerCase();
        return currentNameNormalize === nameNormalized;
      });

      if (duplicate) {
        alert(`${name} is already in contacts`);
        return false;
      }
    },
  }
);

// export const deleteContacts = id => {
//   const func = async dispatch => {
//     try {
//       dispatch(deleteContactsLoading());
//       await contactsApi.requestDeleteContacts(id);
//       dispatch(deleteContactsSuccess(id));
//     } catch (error) {
//       dispatch(deleteContactsError(error.message));
//     }
//   };
//   return func;
// };

export const deleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await contactsApi.requestDeleteContacts(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
