import { Map } from "./Maps";

interface MapContainerProps {
  title: string;
  maps: Map[];
}

export function MapContainer({ title, maps }: MapContainerProps): JSX.Element {
  return (
    <div className="equipment-content pt-4 pl-4 h-full">
      <h1 className="text-2xl text-left text-foreground uppercase font-bold" style={{ fontFamily: 'Roboto' }}>{title}</h1>
      <div className="maps flex flex-wrap gap-1">
        {maps.map((map, index) => (
            <img src={map.image} alt={map.name} className="relative 1xl:w-[146px] 2xl:w-[212px] aspect-square" draggable="false" />
        ))}
      </div>
    </div>
  );
}
