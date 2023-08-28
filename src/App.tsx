import React, { useState } from "react";
import { Dashboard } from "./pages/Dashboard";

interface ToggleButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

function ToggleButton({ name, isActive, onClick, style }: ToggleButtonProps) {
  const buttonClasses = `
    w-full px-[16px] py-[5px] shadow-sm font-semibold text-[1.5em] text-background-colour uppercase 
    ${isActive ? "bg-enabled" : "bg-text-colour"} 
    hover:bg-enabled font-[Roboto]
  `;

  return (
    <button onClick={onClick} style={style} className={buttonClasses}>
      {name}
    </button>
  );
}

export function App(): JSX.Element {
  const [activeButton, setActiveButton] = useState("dashboard");
  const [isImageVisible, setIsImageVisible] = useState(false);

  const getImageClasses = (): string => {
    if (!isImageVisible)
      return "absolute bottom-0 right-0 opacity-0 transform translateY-full h-[64px] w-[64px]";
    return "absolute bottom-0 right-0 transition-transform duration-200 animate-swingIn opacity-100 h-[64px] w-[64px]";
  };

  return (
    <div className="h-[100vh] w-[100vw] relative overscroll-contain overflow-hidden border-text-colour bg-background-colour border-[4px] flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 grid grid-cols-[400px,auto] shadow-md bg-background-colour border-t-[4px] border-l-[4px] border-r-[4px] border-text-colour">
        <div className="border-b-[4px] border-r-[4px] h-full border-text-colour p-2 pl-3 flex items-center overflow-hidden relative">
          <div>
            <p className="text-text-colour inline text-4xl font-[Roboto] font-medium">
              GH
            </p>
            <p className="text-enabled inline text-4xl font-[Roboto] font-medium">
              {"//OS."}
              <span
                className="cursor-pointer"
                onClick={() => setIsImageVisible(!isImageVisible)}
              >
                T
              </span>
            </p>
            <img
              src="/phasmophobia-utils/assets/images/random/thorlar.png"
              alt="Thorlar"
              className={getImageClasses()}
            />
          </div>
          <div className="ml-2 flex flex-col items-start">
            <p className="text-text-colour text-[12px] font-[Roboto] font-medium uppercase">
              Unofficial
            </p>
            <p className="text-text-colour text-[12px] font-[Roboto] font-medium uppercase">
              Phasmophobia Randomiser
            </p>
          </div>
        </div>
        <div className="flex border-b-[4px] h-full border-text-colour p-2">
          <ToggleButton
            name="Item Randomiser"
            isActive={activeButton === "dashboard"}
            onClick={() => setActiveButton("dashboard")}
            style={{ marginRight: "8px" }}
          />
          <ToggleButton
            name="Placeholder"
            isActive={activeButton === "placeholder"}
            onClick={() => setActiveButton("placeholder")}
          />
        </div>
      </div>

      <div className="pt-[80px] h-[100%] shadow-sm">
        {activeButton === "dashboard" && (
          <div style={{ height: "100%", overflowY: "auto" }}>
            <Dashboard />
          </div>
        )}
        {activeButton === "placeholder" && (
          <div style={{ height: "100%", overflowY: "auto" }}>
            {/* Placeholder content */}
          </div>
        )}
      </div>
    </div>
  );
}
