export const isValidStoredToken = (token: string | null): token is string => {
  return Boolean(token && token !== 'undefined' && token !== 'null');
};
