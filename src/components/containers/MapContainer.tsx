import { Map } from "../models/Maps";

interface MapContainerProps {
  title: string;
  maps: Map[];
}

export function MapContainer({ title, maps }: MapContainerProps): JSX.Element {
  return (
    <div className="equipment-content h-full">
      <h1 className="text-[2em] text-left text-foreground uppercase font-bold font-roboto">
        {title}
      </h1>
      <div className="cells flex flex-wrap gap-[12px] flex-row">
        {maps.map((map, index) => (
          <img
            src={map.image}
            alt={map.name}
            className="relative flex-shrink w-[178px] aspect-square"
            draggable="false"
          />
        ))}
      </div>
    </div>
  );
}
