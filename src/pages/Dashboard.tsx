// Dashboard.tsx
import { ItemContainer } from "../components/ItemContainer";
import { mainItems, lightItems, optionalItems } from "../components/Items";

export function Dashboard(): JSX.Element {

  return (

    <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] gap-[12px] h-[100%] max-w-[1800px] m-auto">

      <div className="relative w-[400px] h-[100%] bg-border">Row 1</div>
      <div className="relative w-[400px] h-auto self-start bg-foreground">Row 2</div>

      <div className="relative h-[100%] w-[100%] bg-border/80 rounded-[12px] col-start-2 row-start-1 row-span-2 overflow-auto">
        <div className="bg-black-good m-[10px] pl-[10px] rounded-[12px]">
          <ItemContainer title="Lights" items={lightItems}/>
        </div>
        <div className="bg-black-good m-[10px] pl-[10px] rounded-[12px]">
          <ItemContainer title="Main Equipment" items={mainItems}/>
        </div>
        <div className="bg-black-good m-[10px] pl-[10px] rounded-[12px]">
          <ItemContainer title="Optional Equipment" items={optionalItems}/>
        </div>
      </div>
    </div>
  );
}