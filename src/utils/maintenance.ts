// Bypass secret for team access during maintenance
const BYPASS_SECRET = 'songram2026';

/**
 * Check if the current URL has the bypass parameter with the correct secret
 */
export const hasBypass = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const params = new URLSearchParams(window.location.search);
  return params.get('bypass') === BYPASS_SECRET;
};

/**
 * Get the app URL based on bypass status
 * Returns the real app URL if bypass is present, otherwise returns the maintenance page
 */
export const getAppUrl = (): string => {
  return hasBypass() ? 'https://songram.app/login' : '/maintenance';
};
