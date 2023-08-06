// Dashboard.tsx
import { itemData, mainItems, optionalItems, lightItems } from '../../data/Items';
import { ItemContainer } from "./ItemContainer";
import { Information } from './Information';
import { useEquipmentSelection } from '../hooks/useEquipmentSelection';
import { MapContainer } from './MapContainer';
import { mapData } from '../../data/Maps';

export function Dashboard(): JSX.Element {
  const { selectedItems, disabledItems, linkedItems, handleCheckboxChange, handleItemDisable, isLinkedItemsDisabled, setIsLinkedItemsDisabled, updateLinkedItemsState } = useEquipmentSelection();

  return (
    <div className="randomiser-container flex w-screen h-screen gap-[16px] p-[16px] overflow-hidden">
        <div className="item-container flex flex-col flex-grow flex-shrink w-[55%] gap-[0px] min-h-0 overflow-auto">
          <div className="bg-background flex-auto text-foreground pl-3 pt-2 pr-2">
              <ItemContainer title="Main Equipment" items={mainItems} selectedItems={selectedItems} disabledItems={disabledItems} linkedItems={linkedItems} onItemChange={handleCheckboxChange} onItemDisable={handleItemDisable}/>
            </div>
            <div className="bg-background flex-auto text-foreground pl-3 pt-2 pr-2">
              <ItemContainer title="Optional Equipment" items={optionalItems} selectedItems={selectedItems} disabledItems={disabledItems} linkedItems={linkedItems} onItemChange={handleCheckboxChange} onItemDisable={handleItemDisable}/>
            </div>
            <div className="bg-background flex-auto text-foreground pl-3 pt-2 pr-2">
              <ItemContainer title="Lights" items={lightItems} selectedItems={selectedItems} disabledItems={disabledItems} linkedItems={linkedItems} onItemChange={handleCheckboxChange} onItemDisable={handleItemDisable}/>
            </div>
        </div>
        <div className="information-container flex flex-col w-[40%] gap-[16px]">
          <div className="bg-background text-foreground z-10 flex-auto h-[60%]">
            <Information items={itemData} selectedItems={selectedItems} disabledItems={disabledItems} onItemChange={handleCheckboxChange} isLinkedItemsDisabled={isLinkedItemsDisabled} setIsLinkedItemsDisabled={setIsLinkedItemsDisabled} updateLinkedItemsState={updateLinkedItemsState} />
          </div>
          <div className="bg-background text-foreground flex-auto h-[40%]" >
            {/* <MapContainer title={"Maps"} maps={mapData}/> */}
          </div>
        </div>
    </div>
  );
}