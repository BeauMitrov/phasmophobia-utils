import { Checkbox } from "../Checkbox";
import { Item, itemData } from "../templates/ItemsTemplate";
import { getRandomizedItems } from "../../utilities/randomizationLogic";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InformationProps {
  items: Item[];
  selectedItems: Record<string, boolean>;
  itemTiers: Record<string, number>;
  onItemChange: (item: Item, isChecked: boolean) => void;
  handleTierCycle: (e: React.MouseEvent, item: Item, reverse: boolean) => void;

  maxLight: number;
  maxMain: number;
  maxOptional: number;
  setMaxLight: React.Dispatch<React.SetStateAction<number>>;
  setMaxMain: React.Dispatch<React.SetStateAction<number>>;
  setMaxOptional: React.Dispatch<React.SetStateAction<number>>;
  disabledItems: Record<string, boolean>;
  setItemTiers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  isLinkedItems: boolean;
  setisLinkedItems: (isDisabled: boolean) => void;
  updateLinkedItemsState: (isDisabled: boolean) => void;
  linkedItems: Record<string, boolean>;
  handleItemDisable: (
    item: Item,
    isDisabled: boolean,
    overrideLevelCheck: boolean
  ) => void;
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
    handleItemDisable,
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
      disabledItems,
      isLinkedItems
    );
    const newTiers: Record<string, number> = {};

    randomizedResult.forEach((rItem) => {
      onItemChange(rItem.item, true);
      newTiers[rItem.item.name] = rItem.tier;
    });

    modifiedItemData.forEach((item) => {
      if (!randomizedResult.some((rItem) => rItem.item.name === item.name)) {
        onItemChange(item, false);

        const minTier = item.customMin || item.min;
        const maxTier = item.customMax || item.max;

        newTiers[item.name] =
          Math.floor(Math.random() * (maxTier - minTier + 1)) + minTier;
      }
    });

    setItemTiers((prevTiers) => ({ ...prevTiers, ...newTiers }));
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <div className="flex justify-between items-center border-b-[2px] border-text-colour text-text-colour text-[1.5em] text-left uppercase font-bold text-foreground font-[Roboto] pt-[6px]">
          <h1>Name</h1>
          <h1>Selected Tier</h1>
        </div>

        {Object.entries(groupedItems).map(([type, typeItems], index) => (
          <div
            key={type}
            className={`mb-[12px] ${
              index !== 0 ? "" : "pt-[16px]"
            } border-b-[2px] border-text-colour`}
          >
            <div className="flex flex-row flex-grow pb-[12px] ml-[-6px]">
              <div className="flex flex-col flex-grow">
                {typeItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center"
                  >
                    <div
                      className={`font-bold uppercase text-[1.1em] text-[Roboto] select-none`}
                    >
                      <Checkbox
                        isChecked={selectedItems[item.name]}
                        onChange={(isChecked) => onItemChange(item, isChecked)}
                        label={item.name}
                        isLinked={linkedItems[item.name]}
                        disabled={disabledItems[item.name]}
                        onDisable={() =>
                          handleItemDisable(
                            item,
                            !disabledItems[item.name],
                            true
                          )
                        }
                      />
                    </div>
                    <div
                      className={`font-bold uppercase text-[1.1em] text-[Roboto] select-none cursor-pointer ${
                        linkedItems[item.name]
                          ? "text-text-colour"
                          : selectedItems[item.name]
                          ? "text-enabled"
                          : "text-text-colour/20"
                      }`}
                      onClick={(e) => handleTierCycle(e, item, false)}
                      onContextMenu={(e) => handleTierCycle(e, item, true)}
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
      <div className="flex flex-col space-y-2 mt-auto pb-[12px]">
        {/* <button className="w-full px-[16px] py-[10px] shadow-sm font-semibold text-[1.5em] text-background-colour uppercase bg-text-colour hover:bg-enabled font-[Roboto]">
            Placeholder
        </button> */}
        <div className="relative flex items-center">
          <label className="flex justify-center items-center relative w-full px-[16px] py-[10px] shadow-sm font-semibold text-[1.5em] text-background-colour uppercase bg-text-colour hover:bg-enabled duration-[25ms] font-[Roboto] cursor-pointer select-none">
            <span className="text-center">Linked Items</span>
            <div className="flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 right-4 p-1 border-[2px] w-[24px] h-[24px]">
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
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-background-colour w-[20px] h-[20px]"
                />
              )}
            </div>
          </label>
        </div>
        <button
          className="w-full px-[16px] py-[10px] shadow-sm font-semibold text-[1.5em] text-background-colour uppercase bg-text-colour hover:bg-enabled duration-[25ms] font-[Roboto]"
          onClick={props.showSettingsModal}
        >
          Settings
        </button>
        <button
          className="w-full px-[16px] py-[10px] shadow-sm font-semibold text-[1.5em] text-background-colour uppercase bg-text-colour hover:bg-enabled duration-[25ms] font-[Roboto]"
          onClick={randomizedItems}
        >
          Randomize
        </button>
      </div>
    </div>
  );
}