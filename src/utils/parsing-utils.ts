export const parseIfObject = <T extends string | object>(input: string): string | T => {
  try {
    const obj = JSON.parse(input);
    if (typeof obj === 'object') return obj;
  } catch {
    return input;
  }
  return input;
};
