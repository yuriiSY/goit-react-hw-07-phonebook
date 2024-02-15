import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://65c92176a4fbc162e112a39b.mockapi.io/contacts',
});

export const requestContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const requestAddContacts = async body => {
  const { data } = await contactsInstance.post('/', body);
  return data;
};

export const requestDeleteContacts = async id => {
  console.log(id);
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
