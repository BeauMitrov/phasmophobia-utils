import { Item } from "../components/templates/ItemsTemplate";
import { shuffleArray } from "./shuffleArray";

/**
 * Checks if a given item name is linked to any item in the list.
 *
 * @param {Item[]} allItems - List of all items.
 * @param {string} itemName - Name of the item to check.
 * @returns {boolean} - True if the item is linked to any item in the list.
 */
export const isLinkedItem = (allItems: Item[], itemName: string): boolean => {
  return allItems.some((item) => item.linked?.includes(itemName));
};

/**
 * Gets a random tier for the item, taking into account disabled tiers.
 *
 * @param {Item} item - The item for which to get the tier.
 * @param {any} disabledInfo - Information about which items/tiers are disabled.
 * @returns {number} - A random tier for the item.
 */
export const getRandomTier = (item: Item, disabledInfo: any): number => {
  const minTier = item.customMin || item.min;
  const maxTier = item.customMax || item.max;

  const possibleTiers = Array.from(
    { length: maxTier - minTier + 1 },
    (_, i) => i + minTier
  ).filter((tier) => !disabledInfo[item.name]?.tierDisabled[tier]);

  if (possibleTiers.length === 0) {
    return minTier;
  }

  const randomIndex = Math.floor(Math.random() * possibleTiers.length);
  console.log(possibleTiers);
  return possibleTiers[randomIndex];
};

/**
 * Gets a list of selected items of a specific type.
 *
 * @param {string} type - Type of items to select.
 * @param {number} max - Maximum number of items to select.
 * @param {Item[]} items - List of all items.
 * @param {any} disabledInfo - Information about which items/tiers are disabled.
 * @returns {Object[]} - List of selected items with their tiers.
 */
export const getSelectedItems = (
  type: string,
  max: number,
  items: Item[],
  disabledInfo: any
) => {
  const typeItems = items.filter(
    (item) => item.type === type && !disabledInfo[item.name]?.itemDisabled
  );

  const shuffledItems = shuffleArray(typeItems).slice(0, max);

  return shuffledItems.map((item) => ({
    item,
    tier: getRandomTier(item, disabledInfo),
  }));
};

/**
 * Gets a list of randomized items.
 *
 * @param {Item[]} items - List of all items.
 * @param {Object} maxCounts - Maximum counts of each type of item.
 * @param {Object} disabledInfo - Information about which items/tiers are disabled.
 * @returns {Object[]} - List of randomized items with their tiers.
 */
export const getRandomizedItems = (
  items: Item[],
  maxCounts: { light: number; main: number; optional: number },
  disabledInfo: {
    [k: string]: {
      itemDisabled: boolean;
      tierDisabled: Record<number, boolean>;
    };
  }
): { item: Item; tier: number }[] => {
  return [
    ...getSelectedItems("light", maxCounts.light, items, disabledInfo),
    ...getSelectedItems("main", maxCounts.main, items, disabledInfo),
    ...getSelectedItems("optional", maxCounts.optional, items, disabledInfo),
  ];
};
