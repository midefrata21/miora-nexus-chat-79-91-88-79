export const isActiveRoute = (currentPath: string, targetPath: string): boolean => {
  return currentPath === targetPath || (targetPath === '/' && currentPath === '/');
};