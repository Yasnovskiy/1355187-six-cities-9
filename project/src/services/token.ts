const NAME_TOKEN = 'six-cities-andrey';


export const getToken = (): string => {
  const get = localStorage.getItem(NAME_TOKEN);

  return get ?? '';
};

export const setToken = (token: string): void => {
  localStorage.setItem(NAME_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(NAME_TOKEN);
};
