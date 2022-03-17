export const getExecutableExt = (): string => {
  // May not be supported on all platforms
  // Doing this to try avoid async function
  const platform = (navigator as any).userAgentData.platform.toLowerCase();

  return platform === 'windows' ? '.exe' : '';
};
