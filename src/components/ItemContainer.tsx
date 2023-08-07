import { Item } from "./Items";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { useEquipmentSelection } from "./useEquipmentSelection";

interface ItemContainerProps {
  title: string;
  items: Item[];
}

export function ItemContainer({ title, items }: ItemContainerProps): JSX.Element {

  const { selectedItems, disabledItems, linkedItems, handleCheckboxChange, handleItemDisable } = useEquipmentSelection();

  const handleRightClick = (item: Item, e: React.MouseEvent) => {
    e.preventDefault();
    handleItemDisable(item, !disabledItems[item.name]);
  };

  return (

    <div className="equipment-content w-[100%] pb-[12px]">
      <h1 className="text-[2em] text-left text-foreground uppercase font-bold font-[Roboto]">{title}</h1>
      <div className="cells flex flex-wrap gap-[12px] flex-row">
        {items.map((item, index) => (
            <label
              key={index}
              className={`relative border-4 flex-shrink w-[178px] aspect-square ${
                disabledItems[item.name] ? 'text-disabled' : (
                  linkedItems[item.name] ? 'border-foreground' : (
                    selectedItems[item.name] ? 'border-enabled' : 'border-border'
                  )
                )
              } `}
              onContextMenu={(e) => handleRightClick(item, e)}
            >
              <input type="checkbox" className="hidden" checked={selectedItems[item.name]} onChange={(e) => handleCheckboxChange(item, e.target.checked)} disabled={disabledItems[item.name]} />
              <div 
                className="absolute inset-0 z-10 bg-background bg-repeat" 
                style={{
                    backgroundImage: `linear-gradient(rgba(46, 53, 53, 0.5) 15%, transparent 1px),
                                      linear-gradient(90deg, rgba(46, 53, 53, 0.5) 15%, transparent 1px),
                                      linear-gradient(rgba(46, 53, 53, 0.28) 15%, transparent 1px),
                                      linear-gradient(90deg, rgba(46, 53, 53, 0.28) 15%, transparent 1px)`,
                    backgroundSize: `10% 10%`,
                    backgroundPosition: '-0.5px -0.5px'
                }}              
              />
              <img src={item.image} alt={item.name} className="absolute z-20 object-cover w-full h-full" draggable="false" />
              <div className="flex flex-row absolute top-0 right-0 m-1.5">
              <button onClick={() => handleItemDisable(item, !disabledItems[item.name])} className="bg-opacity-90 bg-border font-semibold rounded-[0.25vw] text-white z-30 flex items-center justify-center" style={{height: '32px', width: '32px'}}>
                <FontAwesomeIcon icon={faBan} className={`${disabledItems[item.name] ? 'text-disabled' : 'text-foreground' }`} style={{fontSize: '24px'}}/>
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
