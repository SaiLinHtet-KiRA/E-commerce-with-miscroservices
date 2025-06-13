export const NumStringToNum = (input: string) => {
  const keys = Object.keys(input);
  for (const key of keys) {
    if (!isNaN(Number(input[key]))) input[key] = Number(input[key]);
  }
  return input;
};
