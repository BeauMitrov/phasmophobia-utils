import { Item } from "../components/templates/ItemsTemplate";
import { DisabledInfo } from "./useEquipmentSelection";

/**
 * handleTierCycle
 * Utility function to handle cycling through tiers of items.
 *
 * @param {React.MouseEvent} e - The mouse event.
 * @param {Item} item - The item whose tier needs to be cycled.
 * @param {boolean} reverse - Whether to reverse the cycling direction.
 * @param {Record<string, number>} itemTiers - The current tiers of all items.
 * @param {Function} setItemTiers - The setter function to update the tiers.
 * @param {Record<string, DisabledInfo>} disabledItems - The current disabled status of all items.
 */
export const handleTierCycle = (
  e: React.MouseEvent,
  item: Item,
  reverse: boolean = false,
  itemTiers: Record<string, number>,
  setItemTiers: (value: React.SetStateAction<Record<string, number>>) => void,
  disabledItems: Record<string, DisabledInfo>
) => {
  e.preventDefault();
  e.stopPropagation();

  setItemTiers((prevTiers) => {
    const currentTier = prevTiers[item.name] || 2;
    let newTier = currentTier;

    do {
      newTier = reverse
        ? newTier === 1
          ? 3
          : newTier - 1
        : newTier === 3
        ? 1
        : newTier + 1;
    } while (
      disabledItems[item.name]?.tierDisabled?.[newTier] &&
      newTier !== currentTier
    );

    return { ...prevTiers, [item.name]: newTier };
  });
};
