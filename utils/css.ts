export const concatClassNames = (...classNames: (string | undefined)[]) => {
  const classes: string[] = [];
  classNames.forEach((className) => {
    if (className) classes.push(className);
  });
  return classes.join(",").trim() || undefined;
};
