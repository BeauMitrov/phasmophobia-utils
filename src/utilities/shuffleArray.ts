/**
 * shuffleArray
 * Randomly shuffles an array using the Fisher-Yates algorithm.
 *
 * @param {T[]} array - The array to be shuffled.
 * @return {T[]} - The shuffled array.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
