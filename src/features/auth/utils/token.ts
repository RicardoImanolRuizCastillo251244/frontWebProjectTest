function parseJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(
      decoded.split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    ));
  } catch (e) {
    return null;
  }
}

export const isValidStoredToken = (token: string | null): token is string => {
  if (!token || token === 'undefined' || token === 'null') return false;
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true; // no exp claim -> assume valid
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
};

export const getTokenExpirySeconds = (token: string | null): number | null => {
  if (!token) return null;
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return null;
  return payload.exp;
};
