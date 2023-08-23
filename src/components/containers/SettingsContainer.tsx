import { useState } from "react";
import { itemData } from "../templates/ItemsTemplate";
import { unlockLevels } from "../templates/LevelsTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SettingsContainerProps {
  isSettingsVisible: boolean;
  onClose: () => void;
  itemData: typeof itemData;
  setItemData: React.Dispatch<React.SetStateAction<typeof itemData>>;
  setDisabledItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export function SettingsContainer(
  props: SettingsContainerProps
): JSX.Element | null {
  const {
    isSettingsVisible,
    onClose,
    itemData,
    setItemData,
    setDisabledItems,
  } = props;

  const [playerLevel, setPlayerLevel] = useState<number>(0);

  const getUpdatedDisabledState = (level: number): Record<string, boolean> => {
    const updatedDisabledState: Record<string, boolean> = {};
    itemData.forEach((item) => {
      const itemUnlockData = unlockLevels.find((u) => u.name === item.name);

      updatedDisabledState[item.name] =
        !!itemUnlockData &&
        level < (itemUnlockData.unlocks[0]?.unlockLevel || Infinity);
    });
    return updatedDisabledState;
  };

  const getUpdatedData = (level: number) => {
    return itemData.map((item) => {
      const itemUnlockData = unlockLevels.find((u) => u.name === item.name);

      if (!itemUnlockData) {
        return {
          ...item,
          customMin: item.name === "Head Gear" ? 2 : 1,
          customMax: 1,
        };
      }

      const availableUnlocks = itemUnlockData.unlocks
        .filter((unlock) => level >= unlock.unlockLevel)
        .sort((a, b) => b.unlockTier - a.unlockTier);

      const highestAvailableUnlock = availableUnlocks[0];

      return highestAvailableUnlock
        ? {
            ...item,
            customMin: item.name === "Head Gear" ? 2 : 1,
            customMax: highestAvailableUnlock.unlockTier,
          }
        : {
            ...item,
            customMin: item.name === "Head Gear" ? 2 : 1,
            customMax: 1,
          };
    });
  };

  const updateItemsBasedOnLevel = (level: number) => {
    setDisabledItems(getUpdatedDisabledState(level));
    setItemData(getUpdatedData(level));
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const level = Number(e.target.value);
    setPlayerLevel(level);
  };

  const handleInputChange = (
    name: string,
    key: "customMin" | "customMax",
    value: number
  ) => {
    setItemData((prevData) =>
      prevData.map((i) => (i.name === name ? { ...i, [key]: value } : i))
    );
  };

  if (!isSettingsVisible) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute w-[600px] h-[600px] bg-background-colour z-50 flex flex-col border-text-colour border-2">
        <div className="p-4 text-text-colour uppercase bg-background-colour font-[Roboto] font-semibold flex items-center justify-between border-b-2">
          <h2 className="text-[1.5em]">Settings - Temporary UI</h2>
          <button
            onClick={onClose}
            aria-label="Close Settings"
            className="text-[24px] hover:text-white duration-[25ms] pr-2"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-4 overflow-auto flex-grow text-text-colour uppercase font-[Roboto] font-semibold text-[1.25em]">
          <div className="mb-2 mt-2">
            <label className="block">
              Player Level
              <div className="flex items-center mt-1">
                <input
                  type="number"
                  value={playerLevel}
                  onChange={handleLevelChange}
                  min="0"
                  max="999"
                  className="p-2 border flex-grow bg-background-colour hover:border-enabled duration-[25ms] focus:ring-0 focus:border-enabled h-10"
                />
                <button
                  onClick={() => updateItemsBasedOnLevel(playerLevel)}
                  className="pl-[64px] pr-[64px] ml-2 uppercase bg-text-colour text-background-colour hover:bg-enabled duration-[25ms] h-10"
                >
                  Update
                </button>
              </div>
            </label>
          </div>
          {itemData.map((item) => (
            <div key={item.name} className="mb-4 mt-4">
              <h3 className="mb-2">{item.name}</h3>
              <div className="flex justify-between">
                {(["customMin", "customMax"] as const).map((key) => (
                  <div
                    key={key}
                    className={`w-1/2 ${key === "customMin" ? "pr-2" : "pl-2"}`}
                  >
                    <label className="block mb-2 text-[16px]">
                      {key === "customMin" ? "Min" : "Max"} Tier
                    </label>
                    <input
                      type="number"
                      value={
                        key === "customMin"
                          ? item.customMin || item.min
                          : item.customMax || item.max
                      }
                      onChange={(e) =>
                        handleInputChange(
                          item.name,
                          key,
                          Number(e.target.value)
                        )
                      }
                      min="1"
                      max="3"
                      className="p-2 border w-full bg-background-colour hover:border-enabled duration-[25ms] focus:ring-0 focus:border-enabled"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
