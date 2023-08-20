export function toRoman(num: number): string {
  switch (num) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    default:
      return "II";
  }
}

export const formatImageName = (itemName: string): string => {
  return itemName.replace(/\s+/g, "");
};
