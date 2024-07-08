export const objectToCssString = (obj: Object): string => {
  return Object.entries(obj)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")
    .replaceAll("_", "-");
};
