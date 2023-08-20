import { Item, itemData } from "../components/templates/ItemsTemplate";

export const shuffleArray = (array: Item[]) =>
  array.sort(() => Math.random() - 0.5);

export const isLinkedItem = (allItems: Item[], itemName: string): boolean => {
  return allItems.some((item) => item.linked?.includes(itemName));
};

const isLinkedChild = (itemName: string, containerType: string): boolean => {
  return itemData.some(
    (item) =>
      item.type !== containerType &&
      item.linked &&
      item.linked.includes(itemName)
  );
};

export const getRandomizedItems = (
  items: Item[],
  maxCounts: { light: number; main: number; optional: number },
  disabledItems: Record<string, boolean>,
  isLinkedItem: boolean
): { item: Item; tier: number }[] => {
  const getSelectedItems = (type: string, max: number) => {
    const typeItems = items.filter((item) => {
      if (item.type !== type || disabledItems[item.name]) return false;

      if (isLinkedItem) {
        if (isLinkedChild(item.name, type)) return false;
      }

      return true;
    });

    const shuffledItems = shuffleArray(typeItems).slice(0, max);

    return shuffledItems.map((item) => {
      const tier =
        Math.floor(Math.random() * (item.max - item.min + 1)) + item.min;
      console.log(`Item: ${item.name}, Tier: ${tier}`);
      return { item, tier };
    });
  };

  return [
    ...getSelectedItems("light", maxCounts.light),
    ...getSelectedItems("main", maxCounts.main),
    ...getSelectedItems("optional", maxCounts.optional),
  ];
};
