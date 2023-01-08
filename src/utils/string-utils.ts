export const getNameInitials = (name: string): string => {
  const lettersRegex: RegExp = new RegExp(/[^a-zA-Z0-9]/, 'gi');

  const parts: string[] = name
    .split(' ')
    .map((v) => v.replace(lettersRegex, '')) // remove non characters
    .filter((x) => x)
    .slice(0, 2);

  const initials: string = parts
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase();

  if (!initials) return '';
  return initials;
};

export const generateHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const generateGameId = (): string => {
  return `${new Date().getTime()}`;
};
