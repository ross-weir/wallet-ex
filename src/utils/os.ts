// May not be supported on all platforms
// Doing this to try avoid async function
export const getOsString = (): string =>
  (navigator as any).userAgentData.platform.toLowerCase();
