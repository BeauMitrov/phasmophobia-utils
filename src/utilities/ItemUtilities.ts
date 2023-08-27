import { Item, itemData } from "../components/templates/ItemsTemplate";
import { unlockLevels } from "../components/templates/LevelsTemplate";
import { DisabledInfo } from "./useEquipmentSelection";

/**
 * groupItemsByType
 * Utility function to group items by their type.
 *
 * @param {Item[]} items - The list of items.
 * @return {Record<string, Item[]>} - The items grouped by their type.
 */
export const groupItemsByType = (items: Item[]): Record<string, Item[]> => {
  return items.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});
};

/**
 * toggleDisableAll
 * Utility function to toggle the disabled status for all items.
 *
 * @param {Item[]} items - The list of items.
 * @param {Record<string, DisabledInfo>} disabledItems - The current disabled status of items.
 * @param {Function} handleTierChange - The function to handle tier changes.
 */
export const toggleDisableAll = (
  items: Item[],
  disabledItems: Record<string, DisabledInfo>,
  handleTierChange: (item: Item, tier: number, isDisabled: boolean) => void
) => {
  const allDisabled = items.every(
    (item) => disabledItems[item.name]?.itemDisabled
  );
  items.forEach((item) => {
    for (let tier = 1; tier <= 3; tier++) {
      handleTierChange(item, tier, !allDisabled);
    }
  });
};

/**
 * handleLevelChange
 * Utility function to handle changes in player level.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
 * @param {Function} setPlayerLevel - Setter function for player level.
 */
export const handleLevelChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPlayerLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  const newLevel = Number(e.target.value);
  setPlayerLevel(newLevel);
};

/**
 * updateTiers
 * Utility function to update tiers based on the provided player level.
 * Tiers are updated based on the unlock levels from the LevelsTemplate.
 *
 * @param {typeof itemData} items - List of items.
 * @param {number} level - Current player level.
 * @param {React.Dispatch<React.SetStateAction<Record<string, DisabledInfo>>>} setDisabledItems - Setter function for the disabled status of items.
 * @param {React.Dispatch<React.SetStateAction<Record<string, boolean>>>} setSelectedItems - Setter function for the selected status of items.
 */
export const updateTiers = (
  items: typeof itemData,
  level: number,
  setDisabledItems: React.Dispatch<
    React.SetStateAction<Record<string, DisabledInfo>>
  >,
  setSelectedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
) => {
  const newDisabledState: Record<string, DisabledInfo> = {};

  items.forEach((item) => {
    const itemUnlockData = unlockLevels.find((u) => u.name === item.name);
    if (!itemUnlockData) return;

    const disabledTiers: Record<number, boolean> = {};
    let isItemDisabled = true;

    [1, 2, 3].forEach((tier) => {
      const isTierDisabled = itemUnlockData.unlocks.some(
        (u) => u.unlockTier === tier && u.unlockLevel > level
      );

      disabledTiers[tier] = isTierDisabled;
      isItemDisabled = isItemDisabled && isTierDisabled;
    });

    newDisabledState[item.name] = {
      itemDisabled: isItemDisabled,
      tierDisabled: disabledTiers,
    };
  });

  setDisabledItems(newDisabledState);
  setSelectedItems((prev) => {
    const updatedSelection = { ...prev };
    Object.keys(updatedSelection).forEach((itemName) => {
      updatedSelection[itemName] = false;
    });
    return updatedSelection;
  });
};

/**
 * handleTierToggle
 * Utility function to handle toggling of tiers.
 * This function toggles the disabled status for a specific tier of a given item.
 *
 * @param {string} itemName - The name of the item whose tier is being toggled.
 * @param {number} tier - The tier number being toggled (1, 2, or 3).
 * @param {Record<string, DisabledInfo>} disabledItems - The current disabled status of items.
 * @param {React.Dispatch<React.SetStateAction<Record<string, DisabledInfo>>>} setDisabledItems - Setter function for the disabled status of items.
 */
export const handleTierToggle = (
  itemName: string,
  tier: number,
  disabledItems: Record<string, DisabledInfo>,
  setDisabledItems: React.Dispatch<
    React.SetStateAction<Record<string, DisabledInfo>>
  >
) => {
  const isTierDisabled = disabledItems[itemName]?.tierDisabled?.[tier];
  setDisabledItems((prev) => ({
    ...prev,
    [itemName]: {
      ...prev[itemName],
      tierDisabled: {
        ...prev[itemName]?.tierDisabled,
        [tier]: !isTierDisabled,
      },
    },
  }));
};

/**
 * Formats the item name to be used as an image name by removing spaces.
 *
 * @param {string} itemName - The name of the item to be formatted.
 * @return {string} - The formatted image name.
 */
export const formatImageName = (itemName: string): string => {
  return itemName.replace(/\s+/g, "");
};
