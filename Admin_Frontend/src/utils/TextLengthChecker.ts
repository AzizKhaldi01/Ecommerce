interface params {
  text: string;
  Length: number;
}

export const checkLength = ({ text, Length }: params): string => {
  if (text.length > Length) {
    return text.slice(0, Length) + "...";
  }
  return text;
};
