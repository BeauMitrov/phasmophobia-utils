import { Item } from "../../data/Items";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

interface ItemContainerProps {
  title: string;
  items: Item[];
  selectedItems: Record<string, boolean>;
  disabledItems: Record<string, boolean>;
  linkedItems: Record<string, boolean>;
  onItemChange: (item: Item, isChecked: boolean) => void;
  onItemDisable: (item: Item, isDisabled: boolean) => void;
}

export function ItemContainer({ title, items, selectedItems, disabledItems, linkedItems, onItemChange, onItemDisable }: ItemContainerProps): JSX.Element {

  const handleRightClick = (item: Item, e: React.MouseEvent) => {
    e.preventDefault();
    onItemDisable(item, !disabledItems[item.name]);
  };

  return (
    <div className="equipment-content p-4 h-full">
      <h1 className="text-3xl text-left text-foreground uppercase font-bold" style={{ fontFamily: 'Roboto' }}>{title}</h1>
      <div className="cells flex flex-wrap gap-1">
        {items.map((item, index) => (
            <label
              key={index}
              className={`relative border-4 w-[58px] sm:w-[70px] md:w-[83px] lg:w-[98px] xl:w-[108px] 1xl:w-[146px] 2xl:w-[212px] flex-wrap aspect-square ${
                disabledItems[item.name] ? 'text-disabled' : (
                  linkedItems[item.name] ? 'border-foreground' : (
                    selectedItems[item.name] ? 'border-enabled' : 'border-border'
                  )
                )
              } `}
              onContextMenu={(e) => handleRightClick(item, e)}
            >
              <input type="checkbox" className="hidden" checked={selectedItems[item.name]} onChange={(e) => onItemChange(item, e.target.checked)} disabled={disabledItems[item.name]} />
              <div className="absolute inset-0 z-10 bg-background bg-repeat bg-[length:6.5px_6.5px] sm:bg-[length:7.5px_7.5px] md:bg-[length:9px_9px] lg:bg-[length:10.5px_10.5px]  xl:bg-[length:11.5px_11.5px] 1xl:bg-[length:15px_15px] 2xl:bg-[length:22.8px_22.8px]"
                style={{
                  backgroundImage: `linear-gradient(rgba(46, 53, 53, 0.5) 2px, transparent 1px),
                                    linear-gradient(90deg, rgba(46, 53, 53, 0.5) 2px, transparent 1px),
                                    linear-gradient(rgba(46, 53, 53, 0.28) 2px, transparent 1px),
                                    linear-gradient(90deg, rgba(46, 53, 53, 0.28) 2px, transparent 1px)`,
                  backgroundPosition: '-0.5px -0.5px'
                }}
              />
              <img src={item.image} alt={item.name} className="absolute z-20 object-cover w-full h-full" draggable="false" />
              <div className="flex flex-row absolute top-0 right-0 m-1">
                  <button onClick={() => onItemDisable(item, !disabledItems[item.name])} className="bg-opacity-80 bg-border h-8 w-8 font-semibold rounded text-white z-30">
                      <FontAwesomeIcon icon={faBan} className={`h-8 w-6 ${disabledItems[item.name] ? 'text-disabled' : 'text-foreground' }`}/>
                  </button>
                  {/* <button onClick={() => onItemDisable(item, !disabledItems[item.name])} className="bg-opacity-80 bg-border h-8 w-8 ml-1 font-semibold rounded text-white z-30">
                      <FontAwesomeIcon icon={faBan} className={`h-8 w-6 ${disabledItems[item.name] ? 'text-disabled' : 'text-foreground' }`}/>
                  </button> */}
              </div>
            </label>
          ))}
      </div>
    </div>
  );
}
