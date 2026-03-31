function parseJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    // base64url -> base64
    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // pad with '='
    while (base64.length % 4) base64 += '=';
    const decoded = atob(base64);
    try {
      return JSON.parse(decoded);
    } catch (e) {
      // fallback: try decodeURIComponent approach
      return JSON.parse(decodeURIComponent(
        decoded.split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      ));
    }
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
