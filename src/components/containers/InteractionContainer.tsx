import { Checkbox } from "../Checkbox";
import { Item, itemData } from "../templates/ItemsTemplate";
import { getRandomizedItems } from "../../utilities/randomizationLogic";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisabledInfo } from "../../utilities/useEquipmentSelection";

interface InformationProps {
  items: Item[];
  selectedItems: Record<string, boolean>;
  itemTiers: Record<string, number>;
  onItemChange: (item: Item, isChecked: boolean) => void;
  handleTierCycle: (
    e: React.MouseEvent,
    item: Item,
    reverse: boolean,
    itemTiers: Record<string, number>,
    setItemTiers: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    disabledItems: Record<string, DisabledInfo>
  ) => void;

  maxLight: number;
  maxMain: number;
  maxOptional: number;
  setMaxLight: React.Dispatch<React.SetStateAction<number>>;
  setMaxMain: React.Dispatch<React.SetStateAction<number>>;
  setMaxOptional: React.Dispatch<React.SetStateAction<number>>;
  disabledItems: Record<string, DisabledInfo>;
  setItemTiers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  isLinkedItems: boolean;
  setisLinkedItems: (isDisabled: boolean) => void;
  updateLinkedItemsState: (isDisabled: boolean) => void;
  linkedItems: Record<string, boolean>;
  handleTierChange: (item: Item, tier: number, isDisabled: boolean) => void;
  showSettingsModal: () => void;
  modifiedItemData: typeof itemData;
}

export function Information(props: InformationProps): JSX.Element {
  const {
    items,
    selectedItems,
    onItemChange,
    itemTiers,
    maxLight,
    maxMain,
    maxOptional,
    disabledItems,
    isLinkedItems,
    setItemTiers,
    handleTierCycle,
    setisLinkedItems,
    updateLinkedItemsState,
    handleTierChange,
    linkedItems,
    modifiedItemData,
  } = props;

  const groupedItems = items.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const randomizedItems = () => {
    const maxCounts = { light: maxLight, main: maxMain, optional: maxOptional };

    const randomizedResult = getRandomizedItems(
      modifiedItemData,
      maxCounts,
      disabledItems
    );

    const newTiers: Record<string, number> = {};

    const resetCategoryItems = (type: string) => {
      items
        .filter((item) => item.type === type)
        .forEach((item) => onItemChange(item, false));
    };

    Object.keys(maxCounts).forEach((type) => {
      if (groupedItems[type])
        resetCategoryItems(type as keyof typeof maxCounts);
    });

    randomizedResult.forEach((rItem) => {
      if (rItem.tier !== null) {
        onItemChange(rItem.item, true);
        newTiers[rItem.item.name] = rItem.tier;
      }
    });

    setItemTiers((prevTiers) => ({ ...prevTiers, ...newTiers }));
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <div className="flex justify-between items-center border-b-2 border-text-colour text-text-colour text-[1.5vw] text-left uppercase font-bold text-foreground font-[Roboto]">
          <h1>Name</h1>
          <h1>Selected Tier</h1>
        </div>

        {Object.entries(groupedItems).map(([type, typeItems], index) => (
          <div
            key={type}
            className={`mb-2 ${
              index !== 0 ? "" : "pt-2"
            } border-b-2 border-text-colour`}
          >
            <div className="flex flex-row flex-grow pb-3 ml-[-6px]">
              <div className="flex flex-col flex-grow">
                {typeItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <div
                      className={`font-bold uppercase text-[0.95vw] text-[Roboto] select-none`}
                    >
                      <Checkbox
                        isChecked={selectedItems[item.name]}
                        onChange={(isChecked) => onItemChange(item, isChecked)}
                        label={item.name}
                        isLinked={linkedItems[item.name]}
                        disabled={disabledItems[item.name]?.itemDisabled}
                        onDisable={() => {
                          const allTiers = [1, 2, 3];
                          const shouldDisable =
                            !disabledItems[item.name]?.itemDisabled;

                          allTiers.forEach((tier) => {
                            handleTierChange(item, tier, shouldDisable);
                          });
                        }}
                      />
                    </div>
                    <div
                      className={`font-bold uppercase text-[0.95vw] text-[Roboto] select-none cursor-pointer ${
                        linkedItems[item.name]
                          ? "text-text-colour"
                          : selectedItems[item.name]
                          ? "text-enabled"
                          : "text-text-colour/20"
                      }`}
                      onClick={(e) =>
                        handleTierCycle(
                          e,
                          item,
                          false,
                          itemTiers,
                          setItemTiers,
                          disabledItems
                        )
                      }
                      onContextMenu={(e) =>
                        handleTierCycle(
                          e,
                          item,
                          true,
                          itemTiers,
                          setItemTiers,
                          disabledItems
                        )
                      }
                    >
                      Tier {itemTiers[item.name] || 2}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-2 mt-auto">
        <button
          className="w-full shadow-sm font-semibold text-[1.25vw] p-[0.5vh] text-background-colour uppercase bg-text-colour hover:bg-enabled duration-[25ms] font-[Roboto]"
          onClick={props.showSettingsModal}
        >
          Settings
        </button>
        <div className="relative flex items-center">
          <label className="flex justify-center items-center relative w-full shadow-sm font-semibold text-[1.25vw] p-[0.5vh] text-background-colour uppercase bg-text-colour hover:bg-enabled duration-[25ms] font-[Roboto] cursor-pointer select-none">
            <span className="text-center">Linked Items</span>
            <div className="flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 right-4 p-1 border-[0.15vw] h-[50%] aspect-square">
              <input
                type="checkbox"
                className="opacity-0 absolute w-full h-full left-0 top-0 z-10 cursor-pointer"
                onChange={(e) => {
                  setisLinkedItems(e.target.checked);
                  updateLinkedItemsState(e.target.checked);
                }}
                checked={isLinkedItems}
              />
              {isLinkedItems && (
                <div className="absolute w-full h-full">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="absolute text-background-colour w-full h-full"
                  />
                </div>
              )}
            </div>
          </label>
        </div>
        <button
          className="w-full shadow-sm font-semibold text-[1.25vw] p-[0.5vh] text-background-colour uppercase bg-text-colour hover:bg-enabled duration-[25ms] font-[Roboto]"
          onClick={randomizedItems}
        >
          Randomize
        </button>
      </div>
    </div>
  );
}
