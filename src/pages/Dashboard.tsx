import React, { useState, useMemo } from "react";
import { ItemContainer } from "../components/containers/ItemContainer";
import { Information } from "../components/containers/InteractionContainer";
import { SettingsContainer } from "../components/containers/SettingsContainer";
import {
  mainItems,
  lightItems,
  optionalItems,
  Item,
  itemData,
} from "../components/templates/ItemsTemplate";
import { useEquipmentSelection } from "../utilities/useEquipmentSelection";

export function Dashboard(): JSX.Element {
  const {
    selectedItems,
    disabledItems,
    linkedItems,
    isLinkedItems,
    onItemChange,
    handleItemDisable,
    setisLinkedItems,
    updateLinkedItemsState,
    setDisabledItems,
  } = useEquipmentSelection();

  const [maxLight, setMaxLight] = useState<number>(3);
  const [maxMain, setMaxMain] = useState<number>(7);
  const [maxOptional, setMaxOptional] = useState<number>(10);
  const [itemTiers, setItemTiers] = useState<Record<string, number>>({});
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [modifiedItemData, setModifiedItemData] = useState(itemData);

  const equipmentConfigs = useMemo(
    () => [
      { title: "Lights", items: lightItems },
      { title: "Main Equipment", items: mainItems },
      { title: "Optional Equipment", items: optionalItems },
    ],
    []
  );

  const handleTierCycle = (
    e: React.MouseEvent,
    item: Item,
    reverse: boolean = false
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setItemTiers((prevTiers) => {
      const currentTier = prevTiers[item.name] || 2;
      const newTier = reverse
        ? currentTier === 1
          ? 3
          : currentTier - 1
        : currentTier === 3
        ? 1
        : currentTier + 1;
      return { ...prevTiers, [item.name]: newTier };
    });
  };

  const commonProps = {
    selectedItems,
    disabledItems,
    linkedItems,
    maxLight,
    maxMain,
    maxOptional,
    onItemChange,
    setItemTiers,
    itemTiers,
    isLinkedItems,
    setMaxLight,
    setMaxMain,
    setMaxOptional,
    handleTierCycle,
    handleItemDisable,
  };

  return (
    <div className="grid grid-cols-[1fr,auto] grid-rows-[auto,1fr] max-h-[100%] max-w-[1800px] m-auto">
      <div className="relative h-[100%] w-[100%] bg-text-colour col-start-1 row-start-1 row-span-1 overflow-auto">
        {equipmentConfigs.map(({ title, items }) => (
          <div
            className="bg-background-colour m-[2px] pl-[12px] pr-[12px]"
            key={title}
          >
            <ItemContainer
              title={title}
              items={items}
              modifiedItemData={modifiedItemData}
              {...commonProps}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col w-[400px] h-full bg-background-colour border-text-colour border-[2px] col-start-2 row-start-1 ml-[-2px]">
        <div className="flex-grow overflow-auto m-[2px] pl-[12px] pr-[12px] bg-background-colour p-[2px]">
          <Information
            items={itemData}
            modifiedItemData={modifiedItemData}
            setisLinkedItems={setisLinkedItems}
            updateLinkedItemsState={updateLinkedItemsState}
            showSettingsModal={() => setIsSettingsVisible(true)}
            {...commonProps}
          />
        </div>
      </div>

      {isSettingsVisible && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60 z-50">
          <SettingsContainer
            isSettingsVisible={isSettingsVisible}
            onClose={() => setIsSettingsVisible(false)}
            itemData={modifiedItemData}
            setItemData={setModifiedItemData}
            setDisabledItems={setDisabledItems}
          />
        </div>
      )}
    </div>
  );
}
