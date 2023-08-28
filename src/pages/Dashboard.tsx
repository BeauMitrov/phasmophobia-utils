import React, { useState, useMemo } from "react";
import { ItemContainer } from "../components/containers/ItemContainer";
import { Information } from "../components/containers/InteractionContainer";
import { SettingsContainer } from "../components/containers/SettingsContainer";
import { itemData } from "../components/templates/ItemsTemplate";
import {
  getLightItems,
  getMainItems,
  getOptionalItems,
} from "../utilities/itemFilter";
import { useEquipmentSelection } from "../utilities/useEquipmentSelection";
import { handleTierCycle } from "../utilities/handleTierCycle";

export function Dashboard(): JSX.Element {
  const {
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
  } = useEquipmentSelection();

  const [maxLight, setMaxLight] = useState<number>(3);
  const [maxMain, setMaxMain] = useState<number>(7);
  const [maxOptional, setMaxOptional] = useState<number>(10);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [modifiedItemData, setModifiedItemData] = useState(itemData);

  const equipmentConfigs = useMemo(
    () => [
      { title: "Lights Equipment", items: getLightItems() },
      { title: "Evidence Equipment", items: getMainItems() },
      { title: "Optional Equipment", items: getOptionalItems() },
    ],
    []
  );

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
    handleTierChange,
  };

  return (
    <div className="grid grid-cols-[1fr,20vw] grid-rows-[auto,1fr] h-full m-auto max-w-[3000px] pb-[16px] overflow-x-hidden">
      <div className="relative overflow-auto">
        {equipmentConfigs.map(({ title, items }) => (
          <div
            className="bg-background-colour pb-[24px] last-of-type:pb-0 m-[2px] pl-[12px] pr-[12px]"
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

      <div className="flex flex-col bg-background-colour">
        <div className="flex-grow overflow-auto pl-[12px] pr-[12px] bg-background-colour">
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
            disabledItems={disabledItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
      )}
    </div>
  );
}
