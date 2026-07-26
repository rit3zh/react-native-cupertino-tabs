const compact = <TObject extends object>(source: TObject): Partial<TObject> => {
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined)
  ) as Partial<TObject>;
};

const isEmpty = <TObject extends object>(source: TObject): boolean => {
  return Object.keys(source).length === 0;
};

export { compact, isEmpty };
