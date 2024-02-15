export const selectAllContacts = store => store.contacts;
export const selectFilteredContacts = store => {
  const { contacts, filter } = store;
  const { items, loading, error } = contacts;

  if (!filter) {
    return contacts;
  }

  const normolizedTarget = filter.toLowerCase();

  const filteredContats = items.filter(({ name }) => {
    const normalizedName = name.toLowerCase();
    return normalizedName.includes(normolizedTarget);
  });

  return {
    items: filteredContats,
    loading,
    error,
  };
};
