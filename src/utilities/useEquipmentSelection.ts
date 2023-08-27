import { useState } from "react";
import { itemData, Item } from "../components/templates/ItemsTemplate";

export type DisabledInfo = {
  itemDisabled: boolean;
  tierDisabled: Record<number, boolean>;
};

interface EquipmentSelection {
  selectedItems: Record<string, boolean>;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  disabledItems: Record<string, DisabledInfo>;
  linkedItems: Record<string, boolean>;
  isLinkedItems: boolean;
  onItemChange: (item: Item, isChecked: boolean) => void;
  handleTierChange: (item: Item, tier: number, isDisabled: boolean) => void;
  setisLinkedItems: (isDisabled: boolean) => void;
  updateLinkedItemsState: (isDisabled: boolean) => void;
  setDisabledItems: React.Dispatch<
    React.SetStateAction<Record<string, DisabledInfo>>
  >;
  itemTiers: Record<string, number>;
  setItemTiers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export function useEquipmentSelection(): EquipmentSelection {
  const getDefaultTierDisabled = () => ({ 1: false, 2: false, 3: false });
  const disableLinkedItems = (itemName: string): void => {
    if (!linkedItems[itemName]) {
      return;
    }

    setSelectedItems((prev) => ({ ...prev, [itemName]: false }));
  };
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(itemData.map((item) => [item.name, false]))
  );
  const [disabledItems, setDisabledItems] = useState<
    Record<string, DisabledInfo>
  >({});
  const [linkedItems, setLinkedItems] = useState<Record<string, boolean>>({});
  const [isLinkedItems, setisLinkedItems] = useState(false);
  const [itemTiers, setItemTiers] = useState<Record<string, number>>(
    Object.fromEntries(itemData.map((item) => [item.name, 2]))
  );

  const areAllTiersDisabled = (item: Item): boolean => {
    return [1, 2, 3].every(
      (tier) => disabledItems[item.name]?.tierDisabled?.[tier]
    );
  };

  function getRandomAvailableTier(item: Item): number | null {
    const availableTiers = [1, 2, 3].filter(
      (tier) => !disabledItems[item.name]?.tierDisabled?.[tier]
    );
    if (availableTiers.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableTiers.length);
    return availableTiers[randomIndex];
  }

  function onItemChange(item: Item, isChecked: boolean): void {
    if (isChecked && areAllTiersDisabled(item)) {
      return;
    }

    if (
      isChecked &&
      disabledItems[item.name]?.tierDisabled?.[itemTiers[item.name]]
    ) {
      const newTier = getRandomAvailableTier(item);
      if (newTier !== null) {
        setItemTiers((prevTiers) => ({ ...prevTiers, [item.name]: newTier }));
      }
    }

    if (!isLinkedItems) {
      setSelectedItems((prev) => ({ ...prev, [item.name]: isChecked }));
      return;
    }

    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = {
        ...prevSelectedItems,
        [item.name]: isChecked,
      };

      itemData.forEach((otherItem) => {
        if (!otherItem.linked) {
          return;
        }

        const isOtherItemSelected = updatedSelectedItems[otherItem.name];
        const updateLinkedStatus = isOtherItemSelected ? true : false;

        otherItem.linked.forEach((linkedItemName) => {
          if (
            isOtherItemSelected ||
            !itemData.some(
              (item) =>
                item.linked?.includes(linkedItemName) &&
                updatedSelectedItems[item.name]
            )
          ) {
            linkedItems[linkedItemName] = updateLinkedStatus;
            updatedSelectedItems[linkedItemName] = updateLinkedStatus;
          }
        });
      });

      setLinkedItems({ ...linkedItems });
      return updatedSelectedItems;
    });
  }

  /**
   * Updates the linked items based on the state of linked items.
   *
   * @param {boolean} isEnabled - Whether the linked items are enabled.
   */
  function updateLinkedItemsState(isEnabled: boolean): void {
    if (!isEnabled) {
      const updatedLinkedItems = Object.fromEntries(
        Object.entries(linkedItems).map(([key]) => [key, false])
      );
      setLinkedItems(updatedLinkedItems);

      const updatedSelectedItems = Object.fromEntries(
        Object.entries(selectedItems).map(([key, value]) => [
          key,
          updatedLinkedItems[key] ? false : value,
        ])
      );
      setSelectedItems(updatedSelectedItems);
      return;
    }

    itemData.forEach((item) => {
      if (!item.linked || !selectedItems[item.name]) {
        return;
      }

      item.linked.forEach((linkedItemName) => {
        linkedItems[linkedItemName] = true;
        if (!selectedItems[linkedItemName]) {
          setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [linkedItemName]: true,
          }));
        }
      });
    });
  }

  /**
   * Handles the change of tier for a specific item.
   *
   * @param {Item} item - The item whose tier is being changed.
   * @param {number} tier - The tier number (1, 2, or 3).
   * @param {boolean} isDisabled - Whether the tier is being disabled.
   */
  function handleTierChange(
    item: Item,
    tier: number,
    isDisabled: boolean
  ): void {
    setDisabledItems((prev) => {
      let existingTierDisabled = getDefaultTierDisabled();

      if (prev[item.name]) {
        Object.assign(existingTierDisabled, prev[item.name].tierDisabled);
      }

      const updatedTierDisabled = {
        ...existingTierDisabled,
        [tier]: isDisabled,
      };

      if (isDisabled || Object.values(updatedTierDisabled).every(Boolean)) {
        setSelectedItems((prevSet) => ({ ...prevSet, [item.name]: false }));
        item.linked?.forEach(disableLinkedItems);
      }

      return {
        ...prev,
        [item.name]: {
          itemDisabled: Object.values(updatedTierDisabled).every(Boolean),
          tierDisabled: updatedTierDisabled,
        },
      };
    });
  }

  return {
    selectedItems,
    disabledItems,
    linkedItems,
    isLinkedItems,
    onItemChange,
    handleTierChange,
    setisLinkedItems,
    updateLinkedItemsState,
    setDisabledItems,
    setSelectedItems,
    itemTiers,
    setItemTiers,
  };
}
