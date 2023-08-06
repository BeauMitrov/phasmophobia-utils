import { useState } from 'react';
import { itemData, Item } from '../../data/Items';

interface EquipmentSelection {
  selectedItems: Record<string, boolean>;
  disabledItems: Record<string, boolean>;
  linkedItems: Record<string, boolean>;
  isLinkedItemsDisabled: boolean;
  handleCheckboxChange: (item: Item, isChecked: boolean) => void;
  handleItemDisable: (item: Item, isDisabled: boolean) => void;
  setIsLinkedItemsDisabled: (isDisabled: boolean) => void;
  updateLinkedItemsState: (isDisabled: boolean) => void;
}

export function useEquipmentSelection(): EquipmentSelection {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(itemData.map(item => [item.name, false]))
  );

  const [disabledItems, setDisabledItems] = useState<Record<string, boolean>>({});
  const [linkedItems, setLinkedItems] = useState<Record<string, boolean>>({});
  const [isLinkedItemsDisabled, setIsLinkedItemsDisabled] = useState(false);

  const handleCheckboxChange = (item: Item, isChecked: boolean) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = { ...prevSelectedItems, [item.name]: isChecked };
  
      if (!isLinkedItemsDisabled) {
        const newLinkedItems = { ...linkedItems };
  
        itemData.forEach((otherItem: Item) => {
          if (otherItem.linked && newSelectedItems[otherItem.name]) {
            otherItem.linked.forEach(linkedItemName => {
              newLinkedItems[linkedItemName] = true;
              newSelectedItems[linkedItemName] = true;
            });
          }
        });
  
        itemData.forEach((otherItem: Item) => {
          if (!newSelectedItems[otherItem.name] && otherItem.linked) {
            otherItem.linked.forEach(linkedItemName => {
              if (!itemData.some(item => item.linked?.includes(linkedItemName) && newSelectedItems[item.name])) {
                newLinkedItems[linkedItemName] = false;
                newSelectedItems[linkedItemName] = false;
              }
            });
          }
        });
  
        setLinkedItems(newLinkedItems);
      }
  
      return newSelectedItems;
    });
  };


  const updateLinkedItemsState = (isDisabled: boolean) => {
    if (isDisabled) {
      setLinkedItems(prevLinkedItems => {
        const newLinkedItems = { ...prevLinkedItems };
        Object.keys(newLinkedItems).forEach(key => newLinkedItems[key] = false);
        return newLinkedItems;
      });
    } else {
      setLinkedItems(prevLinkedItems => {
        const newLinkedItems = { ...prevLinkedItems };
        itemData.forEach(item => {
          if (item.linked && selectedItems[item.name]) {
            item.linked.forEach(linkedItemName => newLinkedItems[linkedItemName] = true);
          }
        });
        return newLinkedItems;
      });
    }
  }
  

  const handleItemDisable = (item: Item, isDisabled: boolean) => {
    setDisabledItems((prevDisabledItems) => ({
      ...prevDisabledItems,
      [item.name]: isDisabled,
    }));
    if (isDisabled) {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [item.name]: false,
      }));
    }
  };

  return {
    selectedItems,
    disabledItems,
    linkedItems,
    isLinkedItemsDisabled,
    handleCheckboxChange,
    handleItemDisable,
    setIsLinkedItemsDisabled,
    updateLinkedItemsState,
  };
}