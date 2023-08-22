import { useState } from "react";
import { itemData, Item } from "../components/templates/ItemsTemplate";
import { unlockLevels } from "../components/templates/LevelsTemplate";

interface EquipmentSelection {
  selectedItems: Record<string, boolean>;
  disabledItems: Record<string, boolean>;
  linkedItems: Record<string, boolean>;
  isLinkedItems: boolean;
  onItemChange: (item: Item, isChecked: boolean) => void;
  handleItemDisable: (
    item: Item,
    isDisabled: boolean,
    overrideLevelCheck: boolean
  ) => void;
  setisLinkedItems: (isDisabled: boolean) => void;
  updateLinkedItemsState: (isDisabled: boolean) => void;
  setPlayerLevel: React.Dispatch<React.SetStateAction<number>>;
  setDisabledItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export function useEquipmentSelection(): EquipmentSelection {
  const [playerLevel, setPlayerLevel] = useState<number>(0);

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(itemData.map((item) => [item.name, false]))
  );

  const [disabledItems, setDisabledItems] = useState<Record<string, boolean>>(
    {}
  );
  const [linkedItems, setLinkedItems] = useState<Record<string, boolean>>({});
  const [isLinkedItems, setisLinkedItems] = useState(true);

  const onItemChange = (item: Item, isChecked: boolean) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = {
        ...prevSelectedItems,
        [item.name]: isChecked,
      };

      if (!isLinkedItems) return updatedSelectedItems;

      itemData.forEach((otherItem) => {
        if (!otherItem.linked) return;

        if (updatedSelectedItems[otherItem.name]) {
          otherItem.linked.forEach((linkedItemName) => {
            linkedItems[linkedItemName] = true;
            updatedSelectedItems[linkedItemName] = true;
          });
        } else {
          otherItem.linked.forEach((linkedItemName) => {
            if (
              !itemData.some(
                (item) =>
                  item.linked?.includes(linkedItemName) &&
                  updatedSelectedItems[item.name]
              )
            ) {
              linkedItems[linkedItemName] = false;
              updatedSelectedItems[linkedItemName] = false;
            }
          });
        }
      });

      setLinkedItems({ ...linkedItems });
      return updatedSelectedItems;
    });
  };

  const updateLinkedItemsState = (isEnabled: boolean) => {
    const newLinkedItems = { ...linkedItems };

    if (!isEnabled) {
      for (let key in newLinkedItems) newLinkedItems[key] = false;

      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = { ...prevSelectedItems };
        for (let key in prevSelectedItems) {
          if (linkedItems[key]) {
            updatedSelectedItems[key] = false;
          }
        }
        return updatedSelectedItems;
      });
    } else {
      itemData.forEach((item) => {
        if (!item.linked || !selectedItems[item.name]) return;

        item.linked.forEach((linkedItemName) => {
          newLinkedItems[linkedItemName] = true;
          if (!selectedItems[linkedItemName]) {
            setSelectedItems((prevSelectedItems) => ({
              ...prevSelectedItems,
              [linkedItemName]: true,
            }));
          }
        });
      });
    }
    setLinkedItems(newLinkedItems);
  };

  const handleItemDisable = (
    item: Item,
    isDisabled: boolean,
    overrideLevelCheck = false
  ) => {
    if (!overrideLevelCheck) {
      const itemUnlockData = unlockLevels.find((u) => u.name === item.name);

      const firstTierUnlockLevel = itemUnlockData?.unlocks[0]?.unlockLevel;

      if (
        firstTierUnlockLevel !== undefined &&
        playerLevel < firstTierUnlockLevel
      ) {
        isDisabled = true;
      }
    }

    setDisabledItems((prev) => ({ ...prev, [item.name]: isDisabled }));

    if (isDisabled) {
      setSelectedItems((prev) => ({ ...prev, [item.name]: false }));
      item.linked?.forEach((linkedItemName) =>
        onItemChange({ name: linkedItemName } as Item, false)
      );
    }
  };

  return {
    selectedItems,
    disabledItems,
    linkedItems,
    isLinkedItems,
    onItemChange,
    handleItemDisable,
    setisLinkedItems,
    updateLinkedItemsState,
    setDisabledItems,
    setPlayerLevel,
  };
}
