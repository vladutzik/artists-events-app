const publicUrl = process.env.PUBLIC_URL || '';

export const routes = {
  index: `${publicUrl}/`,
  artist: `${publicUrl}/:artistName`,
};

export const buildUrl = (route, props = {}) => {
  if (!route) return route;

  return Object.keys(props).reduce((newStr, prop) => {
    const value = props[prop];
    const regexp = new RegExp(`:${prop}`, 'g');
    return newStr.replace(regexp, value);
  }, route);
};

export default routes;