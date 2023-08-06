import React, { useEffect, useState } from 'react';
import { Item } from '../../data/Items';

interface InformationProps {
  items: Item[];
  selectedItems: Record<string, boolean>;
  disabledItems: Record<string, boolean>;
  onItemChange: (item: Item, isChecked: boolean) => void;
  isLinkedItemsDisabled: boolean;
  setIsLinkedItemsDisabled: (isDisabled: boolean) => void;
  updateLinkedItemsState: (isDisabled: boolean) => void;
}

export function Information({
  items,
  selectedItems,
  disabledItems,
  onItemChange,
  isLinkedItemsDisabled,
  setIsLinkedItemsDisabled,
  updateLinkedItemsState
}: InformationProps): JSX.Element {
  const [maxMain, setMaxMain] = useState<number>(4);
  const [maxOptional, setMaxOptional] = useState<number>(8);
  const [maxLight, setMaxLight] = useState<number>(1);

  useEffect(() => {
    const updateMax = (type: string, maxSetter: React.Dispatch<React.SetStateAction<number>>) => {
      const total = items.filter(item => item.type === type && !disabledItems[item.name]).length;
      maxSetter(oldMax => (oldMax > total ? total : oldMax));
    }

    updateMax('main', setMaxMain);
    updateMax('optional', setMaxOptional);
    updateMax('light', setMaxLight);
  }, [items, disabledItems]);

  const randomizeItems = () => {
    const isLinkedItem = (itemName: string) =>
      items.some(item => item.linked?.includes(itemName));

    const shuffleArray = (array: Item[]) => array.sort(() => Math.random() - 0.5);
    const getSelectedItems = (type: string, max: number) => {
      let typeItems = items.filter(
        item =>
          item.type === type &&
          !disabledItems[item.name] &&
          !(isLinkedItem(item.name) && !isLinkedItemsDisabled)
      );
      return shuffleArray(typeItems).slice(0, max);
    };

    const selectedMainItems = getSelectedItems('main', maxMain);
    const selectedOptionalItems = getSelectedItems('optional', maxOptional);
    const selectedLightItems = getSelectedItems('light', maxLight);
    const selectedItemsArray = [...selectedMainItems, ...selectedOptionalItems, ...selectedLightItems];

    items.forEach(item => {
      const isChecked = selectedItemsArray.includes(item);
      onItemChange(item, isChecked);
    });
  };

  return (
    <div className="w-1/2 p-5 flex flex-col">
      <h1 className="text-3xl text-left pb-3 uppercase font-bold text-foreground" style={{ fontFamily: 'Roboto' }}>Selected Items</h1>
      
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col flex-grow pr-3">
          {items.map(item => (
            <div className="text-white" key={item.name}>
              <input
                type="checkbox"
                checked={selectedItems[item.name]}
                onChange={e => onItemChange(item, e.target.checked)}
              />
              <label className="pl-2">{item.name}</label>
            </div>
          ))}
        </div>

        <div className="flex flex-col pl-3">
          {[
            { label: 'Main', max: maxMain, maxSetter: setMaxMain },
            { label: 'Optional', max: maxOptional, maxSetter: setMaxOptional },
            { label: 'Light', max: maxLight, maxSetter: setMaxLight },
          ].map(({ label, max, maxSetter }) => (
            <div key={label} className="mb-2">
              <label className="text-xl text-white">{label}: </label>
              <input
                type="number"
                className="text-black"
                value={max}
                onChange={e => maxSetter(Number(e.target.value))}
                min="0"
                max={items.filter(item => item.type === label.toLowerCase() && !disabledItems[item.name]).length}
              />
            </div>
          ))}
          <button className="px-4 py-2 shadow-sm font-semibold text-sm text-white bg-border rounded-full mb-2" onClick={randomizeItems}>Randomize</button>
          <div>
            <input
              type="checkbox"
              checked={isLinkedItemsDisabled}
              onChange={e => {
                setIsLinkedItemsDisabled(e.target.checked);
                updateLinkedItemsState(e.target.checked);
              }}
            />
            <label className="pl-2 text-white">Disable Item Linking</label>
          </div>
        </div>
      </div>
    </div>
  );
};