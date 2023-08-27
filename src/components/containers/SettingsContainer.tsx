import { useState } from "react";
import { itemData } from "../templates/ItemsTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { DisabledInfo } from "../../utilities/useEquipmentSelection";
import { updateTiers } from "../../utilities/itemUtilities";

interface SettingsContainerProps {
  isSettingsVisible: boolean;
  onClose: () => void;
  itemData: typeof itemData;
  setItemData: React.Dispatch<React.SetStateAction<typeof itemData>>;
  disabledItems: Record<string, DisabledInfo>;
  setDisabledItems: React.Dispatch<
    React.SetStateAction<Record<string, DisabledInfo>>
  >;
  setSelectedItems: React.Dispatch<
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
    setSelectedItems,
    setDisabledItems,
    // disabledItems,
  } = props;

  const [playerLevel, setPlayerLevel] = useState<number>(0);

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const level = Math.min(Number(e.target.value), 999);
    setPlayerLevel(level);
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
                  onInput={(e) => {
                    const value = parseInt(e.currentTarget.value, 10);
                    if (value > 999) {
                      e.currentTarget.value = "999";
                      setPlayerLevel(999);
                    }
                  }}
                  min="0"
                  max="999"
                  className="p-2 border flex-grow bg-background-colour hover:border-enabled duration-[25ms] focus:ring-0 focus:border-enabled h-10"
                />
                <button
                  onClick={() =>
                    updateTiers(
                      itemData,
                      playerLevel,
                      setDisabledItems,
                      setSelectedItems
                    )
                  }
                  className="pl-[64px] pr-[64px] ml-2 uppercase bg-text-colour text-background-colour hover:bg-enabled duration-[25ms] h-10"
                >
                  Update
                </button>
              </div>
            </label>
          </div>
          {/* {itemData.map((item) => (
            <div key={item.name} className="mb-4 mt-4">
              <h3 className="mb-2">{item.name}</h3>
              <div className="flex justify-between">
                {[1, 2, 3].map((tier) => (
                  <div key={tier}>
                    <label className="block mb-2 text-[16px]">
                      Tier {tier}
                    </label>
                    <input
                      type="checkbox"
                      checked={!disabledItems[item.name]?.tierDisabled?.[tier]}
                      onChange={() =>
                        handleTierToggle(
                          item.name,
                          tier,
                          disabledItems,
                          setDisabledItems
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
