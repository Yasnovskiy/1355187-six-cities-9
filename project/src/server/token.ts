const NAM_TOKEN = 'andrey-token';


export const getToken = (): string => {
  const get = localStorage.getItem(NAM_TOKEN);

  return get ?? '';
};

export const setToken = (token: string): void => {
  localStorage.setItem(NAM_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(NAM_TOKEN);
};
