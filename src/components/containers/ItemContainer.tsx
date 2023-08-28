import { Item, itemData } from "../templates/ItemsTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faRotateRight,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import { getRandomizedItems } from "../../utilities/randomizationLogic";
import {
  formatImageName,
  toggleDisableAll,
} from "../../utilities/itemUtilities";
import { DisabledInfo } from "../../utilities/useEquipmentSelection";

interface ItemContainerProps {
  title: string;
  items: Item[];
  selectedItems: Record<string, boolean>;
  disabledItems: Record<string, DisabledInfo>;
  linkedItems: Record<string, boolean>;
  isLinkedItems: boolean;
  onItemChange: (item: Item, isChecked: boolean) => void;
  maxLight: number;
  maxMain: number;
  maxOptional: number;
  itemTiers: Record<string, number>;
  setItemTiers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setMaxLight: React.Dispatch<React.SetStateAction<number>>;
  setMaxMain: React.Dispatch<React.SetStateAction<number>>;
  setMaxOptional: React.Dispatch<React.SetStateAction<number>>;
  handleTierChange: (item: Item, tier: number, isDisabled: boolean) => void;
  modifiedItemData: typeof itemData;
}

export function ItemContainer({
  title,
  items,
  selectedItems,
  disabledItems,
  linkedItems,
  onItemChange,
  isLinkedItems,
  maxLight,
  maxMain,
  maxOptional,
  setMaxLight,
  setMaxMain,
  setMaxOptional,
  itemTiers,
  setItemTiers,
  modifiedItemData,
  handleTierChange,
}: ItemContainerProps): JSX.Element {
  function isLinkedItemEnabled(
    item: Item,
    tier: number,
    linkedItems: Record<string, boolean>,
    disabledItems: Record<string, DisabledInfo>
  ): boolean {
    return (
      !!linkedItems[item.name] &&
      itemTiers[item.name] === tier &&
      (!disabledItems[item.name] || !disabledItems[item.name].itemDisabled)
    );
  }

  const getAvailableTiers = (item: Item): number[] => {
    const modifiedItem =
      modifiedItemData.find((mItem) => mItem.name === item.name) || item;
    const minTier = modifiedItem.customMin || modifiedItem.min;
    const maxTier = modifiedItem.customMax || modifiedItem.max;

    const potentialTiers = Array.from(
      { length: maxTier - minTier + 1 },
      (_, i) => minTier + i
    );

    const availableTiers = potentialTiers.filter(
      (tier) => !disabledItems[item.name]?.tierDisabled[tier]
    );

    return availableTiers;
  };

  const formatAvailableTiers = (availableTiers: number[]): string => {
    if (availableTiers.length === 0) return "None Available";

    if (availableTiers.length === 3) return "All Tiers Available";

    if (availableTiers.length === 1)
      return `Only Tier ${availableTiers[0]} Available`;

    return `Tiers ${availableTiers.join(" & ")} Available`;
  };

  const randomizeContainerItems = () => {
    let maxCount: number;
    switch (title) {
      case "Lights Equipment":
        maxCount = maxLight;
        break;
      case "Evidence Equipment":
        maxCount = maxMain;
        break;
      default:
        maxCount = maxOptional;
    }

    const maxCounts = {
      light: title === "Lights Equipment" ? maxCount : 0,
      main: title === "Evidence Equipment" ? maxCount : 0,
      optional:
        title !== "Lights Equipment" && title !== "Evidence Equipment"
          ? maxCount
          : 0,
    };

    const randomizedResult = getRandomizedItems(
      items,
      maxCounts,
      disabledItems
    );

    const newTiers: Record<string, number> = {};

    randomizedResult.forEach((rItem) => {
      onItemChange(rItem.item, true);
      newTiers[rItem.item.name] = rItem.tier;
    });

    items.forEach((item) => {
      const existsInRandomizedResult = randomizedResult.some(
        (rItem) => rItem.item.name === item.name && rItem.tier !== null
      );

      if (!existsInRandomizedResult) {
        onItemChange(item, false);
        const availableTiers = getAvailableTiers(item);
        if (availableTiers.length) {
          const randomTier =
            availableTiers[Math.floor(Math.random() * availableTiers.length)];
          newTiers[item.name] = randomTier;
        }
      }
    });

    setItemTiers((prevTiers) => ({ ...prevTiers, ...newTiers }));
  };

  const adjustCount = (action: "increment" | "decrement" | "max" | "min") => {
    const totalItems = items.length;

    const getAdjustedCount = (currentCount: number) => {
      switch (action) {
        case "increment":
          return Math.min(currentCount + 1, totalItems);
        case "decrement":
          return Math.max(currentCount - 1, 0);
        case "max":
          return totalItems;
        case "min":
          return 0;
        default:
          return currentCount;
      }
    };

    const adjustSetter = (
      setter: React.Dispatch<React.SetStateAction<number>>
    ) => {
      setter((prevCount) => getAdjustedCount(prevCount));
    };

    switch (title) {
      case "Lights Equipment":
        adjustSetter(setMaxLight);
        break;
      case "Evidence Equipment":
        adjustSetter(setMaxMain);
        break;
      default:
        adjustSetter(setMaxOptional);
    }
  };

  const getBorderColor = (itemName: string, tier: number): string => {
    if (disabledItems[itemName]?.itemDisabled) return "text-disabled";
    if (disabledItems[itemName]?.tierDisabled?.[tier]) return "text-disabled";
    if (linkedItems[itemName] && selectedItems[itemName])
      return "border-enabled";
    if (linkedItems[itemName]) return "border-text-colour";
    if (selectedItems[itemName]) return "border-enabled";
    return "border-border-colour";
  };

  return (
    <div className="equipment-content">
      <div className="flex items-center justify-between space-x-1">
        <div className="flex items-center mb-1">
          <h1 className="text-4xl text-left uppercase font-bold text-text-colour font-[Roboto] pr-1 mr-1">
            {title}
          </h1>
          <button
            className="hover:text-white transition duration-[50ms] text-[#ff2424] text-3xl mr-2 flex items-center"
            title="Toggle All"
            onClick={(e) => {
              e.preventDefault();
              toggleDisableAll(items, disabledItems, handleTierChange);
            }}
          >
            <FontAwesomeIcon className="text-3xl" icon={faBan} />
          </button>

          <button
            className="hover:text-white transition duration-[50ms] text-green text-3xl mr-2 flex items-center"
            title="Refresh Category"
            onClick={randomizeContainerItems}
          >
            <FontAwesomeIcon className="text-3xl" icon={faRotateRight} />
          </button>
        </div>

        <div className="flex items-center space-x-1 text-text-colour pr-1">
          <button
            onClick={() => adjustCount("min")}
            className="hover:text-white transition duration-[50ms] text-3xl"
          >
            <FontAwesomeIcon icon={faCaretLeft} className="mr-[-4px]" />
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <button
            onClick={() => adjustCount("decrement")}
            className="hover:text-white transition duration-[50ms] text-3xl"
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <span className="font-bold font-[Roboto] text-3xl w-[32px] text-center inline-block">
            {title === "Lights Equipment"
              ? maxLight
              : title === "Evidence Equipment"
              ? maxMain
              : maxOptional}
          </span>
          <button
            onClick={() => adjustCount("increment")}
            className="hover:text-white transition duration-[50ms] text-3xl"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
          <button
            onClick={() => adjustCount("max")}
            className="hover:text-white transition duration-[50ms] text-3xl"
          >
            <FontAwesomeIcon icon={faCaretRight} className="mr-[-4px]" />
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>
      </div>

      <div className="grid gap-2">
        {items.map((item, index) => (
          <div key={index} className={`grid grid-cols-4 items-center gap-1`}>
            {/* Item Name */}
            <div
              className="w-full h-full bg-text-colour cursor-pointer"
              onClick={() => {
                onItemChange(item, !selectedItems[item.name]);
              }}
              onContextMenu={(e) => {
                e.preventDefault();

                const allTiersDisabled = [1, 2, 3].every(
                  (tier) => disabledItems[item.name]?.tierDisabled?.[tier]
                );

                [1, 2, 3].forEach((tier) => {
                  handleTierChange(item, tier, !allTiersDisabled);
                });
              }}
            >
              <div className="h-full w-full">
                <div
                  className={`font-[Roboto] uppercase p-[0.5vw] w-full h-full select-none overflow-hidden hover:bg-enabled ${getBorderColor(
                    item.name,
                    itemTiers[item.name]
                  )} ${
                    selectedItems[item.name] ? "bg-enabled" : "bg-text-colour"
                  }`}
                >
                  <div className="text-[1.25vw] font-semibold">{item.name}</div>
                  <div className="text-[1vw] font-medium">
                    {formatAvailableTiers(getAvailableTiers(item))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tiers */}
            {[1, 2, 3].map((tier) => (
              <div
                key={tier}
                onClick={() => {
                  if (!disabledItems[item.name]?.tierDisabled?.[tier]) {
                    const isSelected =
                      selectedItems[item.name] && itemTiers[item.name] === tier;
                    onItemChange(item, !isSelected);
                    setItemTiers({ ...itemTiers, [item.name]: tier });
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleTierChange(
                    item,
                    tier,
                    !disabledItems[item.name]?.tierDisabled?.[tier]
                  );
                }}
                className={`relative flex justify-center items-center p-2 cursor-pointer border-4 ${getBorderColor(
                  item.name,
                  tier
                )} ${
                  (selectedItems[item.name] && itemTiers[item.name] === tier) ||
                  isLinkedItemEnabled(item, tier, linkedItems, disabledItems)
                    ? "opacity-100"
                    : "opacity-[35%]"
                }`}
              >
                {item.name === "Head Gear" &&
                  tier === 1 &&
                  disabledItems[item.name]?.tierDisabled?.[1] && (
                    <div className="absolute bottom-[10%] left-0 w-full flex justify-center items-center z-[15] font-[Roboto] uppercase font-medium text-white text-[0.75vw]">
                      Disabled By Default
                    </div>
                  )}

                {disabledItems[item.name]?.tierDisabled?.[tier] && (
                  <div
                    className={`absolute inset-0 flex justify-center items-center bg-[#020202]/80 z-[11] 
  ${disabledItems[item.name]?.tierDisabled?.[tier] ? "" : "hidden"}`}
                  >
                    <img
                      src="/phasmophobia-utils/assets/images/tiers/Lock.png"
                      alt="Locked"
                      className="z-12 w-1/5"
                    />
                  </div>
                )}
                <div
                  className="absolute inset-0 z-0 bg-cell-colour bg-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(46, 53, 53, 0.5) 10%, transparent 1px), linear-gradient(90deg, rgba(46, 53, 53, 0.5) 10%, transparent 1px), linear-gradient(rgba(46, 53, 53, 0.28) 10%, transparent 1px), linear-gradient(90deg, rgba(46, 53, 53, 0.28) 10%, transparent 1px)`,
                    backgroundSize: "4.75% 10%",
                    backgroundPosition: "-0.5px -0.5px",
                  }}
                ></div>
                <img
                  src={`/phasmophobia-utils/assets/images/${
                    item.type
                  }/${formatImageName(item.name)}${tier}.png`}
                  alt={item.name}
                  className="z-9 object-cover w-[40%] ease-in-out transform scale-100 hover:scale-110 duration-[100ms] select-none"
                  draggable="false"
                />
                <img
                  src={`/phasmophobia-utils/assets/images/tiers/Tier${tier}.png`}
                  alt={`Tier ${tier}`}
                  className={`absolute top-1 right-1 w-[7%] z-10 mr-1 mt-1 select-none`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
