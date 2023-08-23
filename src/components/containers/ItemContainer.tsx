import { Item, itemData } from "../templates/ItemsTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faRotateRight,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "../Checkbox";
import { getRandomizedItems } from "../../utilities/randomizationLogic";
import { toRoman, formatImageName } from "../../utilities/ItemUtilities";
import { useEffect, useState } from "react";
import { Tooltip } from "../Tooltip";

interface ItemContainerProps {
  title: string;
  items: Item[];
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
  maxLight: number;
  maxMain: number;
  maxOptional: number;
  itemTiers: Record<string, number>;
  setItemTiers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setMaxLight: React.Dispatch<React.SetStateAction<number>>;
  setMaxMain: React.Dispatch<React.SetStateAction<number>>;
  setMaxOptional: React.Dispatch<React.SetStateAction<number>>;
  handleTierCycle: (e: React.MouseEvent, item: Item, reverse: boolean) => void;
  modifiedItemData: typeof itemData;
}

export function ItemContainer({
  title,
  items,
  selectedItems,
  disabledItems,
  linkedItems,
  onItemChange,
  handleItemDisable,
  isLinkedItems,
  maxLight,
  maxMain,
  maxOptional,
  setItemTiers,
  itemTiers,
  setMaxLight,
  setMaxMain,
  setMaxOptional,
  handleTierCycle,
  modifiedItemData,
}: ItemContainerProps): JSX.Element {
  const handleRightClick = (item: Item, e: React.MouseEvent) => {
    e.preventDefault();
    handleItemDisable(item, !disabledItems[item.name], true);
  };

  const toggleDisableAll = () => {
    const allDisabled = items.every((item) => disabledItems[item.name]);
    items.forEach((item) => handleItemDisable(item, !allDisabled, true));
  };

  const randomizeContainerItems = () => {
    let maxCount: number;
    switch (title) {
      case "Lights":
        maxCount = maxLight;
        break;
      case "Main Equipment":
        maxCount = maxMain;
        break;
      default:
        maxCount = maxOptional;
    }

    const maxCounts = {
      light: title === "Lights" ? maxCount : 0,
      main: title === "Main Equipment" ? maxCount : 0,
      optional: title !== "Lights" && title !== "Main Equipment" ? maxCount : 0,
    };

    const randomizedResult = getRandomizedItems(
      items,
      maxCounts,
      disabledItems,
      isLinkedItems
    );

    const newTiers: Record<string, number> = {};

    randomizedResult.forEach((rItem) => {
      onItemChange(rItem.item, true);
      newTiers[rItem.item.name] = rItem.tier;
    });

    items.forEach((item) => {
      const modifiedItem =
        modifiedItemData.find((mItem) => mItem.name === item.name) || item;

      const minTier = modifiedItem.customMin || modifiedItem.min;
      const maxTier = modifiedItem.customMax || modifiedItem.max;

      newTiers[item.name] =
        Math.floor(Math.random() * (maxTier - minTier + 1)) + minTier;
    });

    setItemTiers((prevTiers) => ({ ...prevTiers, ...newTiers }));

    items.forEach((item) => {
      if (!randomizedResult.some((rItem) => rItem.item.name === item.name)) {
        onItemChange(item, false);
      }
    });
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
      case "Lights":
        adjustSetter(setMaxLight);
        break;
      case "Main Equipment":
        adjustSetter(setMaxMain);
        break;
      default:
        adjustSetter(setMaxOptional);
    }
  };

  const getBorderColor = (itemName: string): string => {
    if (disabledItems[itemName]) return "text-disabled";
    if (linkedItems[itemName]) return "border-text-colour";
    if (selectedItems[itemName]) return "border-enabled";
    return "border-border-colour";
  };

  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const [numColumns, setNumColumns] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.querySelector(".cells")?.clientWidth || 0;
      const itemWidth = 190;
      const calculatedColumns = Math.floor(containerWidth / itemWidth);
      setNumColumns(calculatedColumns);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lastRowItemCount = items.length % numColumns;
  const blankCells = lastRowItemCount > 0 ? numColumns - lastRowItemCount : 0;

  return (
    <div className="equipment-content pb-[12px]">
      <div className="flex items-center justify-between space-x-1">
        <div className="flex items-center">
          <h1 className="text-[2em] text-left uppercase font-bold text-text-colour font-[Roboto] pr-1 pl-[3px] mr-1">
            {title}
          </h1>
          <button
            className="hover:text-white transition duration-[50ms] text-disabled text-[20px] mr-2"
            title="Toggle All"
            onClick={toggleDisableAll}
          >
            <FontAwesomeIcon className="text-[24px]" icon={faBan} />
          </button>

          <button
            className="hover:text-white transition duration-[50ms] text-green text-[20px] mr-2"
            title="Refresh Category"
            onClick={randomizeContainerItems}
          >
            <FontAwesomeIcon className="text-[24px]" icon={faRotateRight} />
          </button>
        </div>

        <div className="flex items-center space-x-1  text-text-colour pr-[4px]">
          <button
            onClick={() => adjustCount("min")}
            className="hover:text-white transition duration-[50ms] text-[1.75em] mb-[1px] pr-[5px]"
          >
            <FontAwesomeIcon icon={faCaretLeft} className="mr-[-4px]" />
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <button
            onClick={() => adjustCount("decrement")}
            className="hover:text-white transition duration-[50ms] text-[1.75em] mb-[1px]"
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <span className="font-bold font-[Roboto] text-[1.75em] w-[32px] text-center inline-block">
            {title === "Lights"
              ? maxLight
              : title === "Main Equipment"
              ? maxMain
              : maxOptional}
          </span>
          <button
            onClick={() => adjustCount("increment")}
            className="hover:text-white transition duration-[50ms] text-[1.75em] mb-[1px] pr-[5px]"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
          <button
            onClick={() => adjustCount("max")}
            className="hover:text-white transition duration-[50ms] text-[1.75em] mb-[1px]"
          >
            <FontAwesomeIcon icon={faCaretRight} className="mr-[-4px]" />
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>
      </div>
      <div className="cells grid gap-[12px] place-items-center pb-[11px]">
        {" "}
        {items.map((item, index) => (
          <label
            key={index}
            className={`label-hover relative border-4 flex-shrink w-[178px] aspect-square ${getBorderColor(
              item.name
            )} flex items-center justify-center transition-border-color duration-[25ms] ease-in-out`}
            onMouseEnter={() => setVisibleTooltip(item.name)}
            onMouseLeave={() => setVisibleTooltip(null)}
            onContextMenu={(e) => handleRightClick(item, e)}
          >
            <Checkbox
              isChecked={selectedItems[item.name]}
              onChange={(isChecked) => onItemChange(item, isChecked)}
              disabled={disabledItems[item.name]}
            />
            <div
              className="absolute inset-0 z-10 bg-cell-colour bg-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(46, 53, 53, 0.5) 10%, transparent 1px),
                                    linear-gradient(90deg, rgba(46, 53, 53, 0.5) 10%, transparent 1px),
                                    linear-gradient(rgba(46, 53, 53, 0.28) 10%, transparent 1px),
                                    linear-gradient(90deg, rgba(46, 53, 53, 0.28) 10%, transparent 1px)`,
                backgroundSize: `10% 10%`,
                backgroundPosition: "-1.5px -1.5px",
              }}
            />
            <Tooltip
              content={item.name}
              isVisible={visibleTooltip === item.name}
            />{" "}
            {[1, 2, 3].map((tier) => (
              <img
                key={`${item.name}${tier}`}
                src={`/phasmophobia-utils/assets/images/${
                  item.type
                }/${formatImageName(item.name)}${tier}.png`}
                alt={item.name}
                className={`scale-image absolute z-20 object-cover w-[90%] h-[90%] transform transition-transform duration-[50ms] ${
                  tier !== (itemTiers[item.name] || 2) && "hidden"
                }`}
                draggable="false"
              />
            ))}{" "}
            <div className="flex flex-col absolute top-0 left-0 m-1 space-y-1">
              <div className="flex items-center">
                {" "}
                {[1, 2, 3].map((tier) => (
                  <img
                    key={tier}
                    src={`/phasmophobia-utils/assets/images/tiers/Tier${tier}.png`}
                    alt={`Tier ${tier}`}
                    className={`w-[24px] h-[24px] z-30 ${
                      tier !== (itemTiers[item.name] || 2) && "hidden"
                    }`}
                    onClick={(e) => handleTierCycle(e, item, false)}
                    onContextMenu={(e) => handleTierCycle(e, item, true)}
                  />
                ))}{" "}
                <div className="text-white font-[Roboto] font-bold rounded-[0.25vw] z-30 flex items-center justify-center h-[32px] w-auto ml-2">
                  {" "}
                  {`TIER ${toRoman(itemTiers[item.name])}`}{" "}
                </div>
              </div>
              {/* <button onClick={()=> onItemDisable(item, !disabledItems[item.name])} title="Toggle Disable" className="bg-border-colour/60 font-semibold rounded-[0.25vw] z-30 flex items-center justify-center h-[32px] w-[32px]">
                <FontAwesomeIcon icon={faBan} className={` hover:text-white transition duration-[50ms] text-[22px] ${disabledItems[item.name] ? 'text-disabled' : 'text-text-colour' }`} />
              </button> */}
            </div>
          </label>
        ))}
        {Array.from({ length: blankCells }).map((_, index) => (
          <div
            key={`blank-${index}`}
            className="label-hover relative border-4 flex-shrink w-[178px] aspect-square bg-cell-colour border-cell-colour flex items-center justify-center transition-border-color duration-[25ms] ease-in-out opacity-100"
          ></div>
        ))}
      </div>
    </div>
  );
}
