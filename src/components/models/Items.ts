export interface Item {
  name: string;
  type: "main" | "optional" | "light";
  images: {
    Tier1: string;
    Tier2: string;
    Tier3?: string;
  };
  min: number;
  max: number;
  linked?: string[];
}

export const itemData: Item[] = [
  // Lights
  {
    name: "Flashlight",
    type: "light",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/light/Flashlight1.png",
      Tier2: "/phasmophobia-utils/assets/images/light/Flashlight2.png",
      Tier3: "/phasmophobia-utils/assets/images/light/Flashlight3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Head Gear",
    type: "light",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/light/HeadGear1.png",
      Tier2: "/phasmophobia-utils/assets/images/light/HeadGear2.png",
      Tier3: "/phasmophobia-utils/assets/images/light/HeadGear3.png",
    },
    min: 2,
    max: 3,
  },
  {
    name: "Firelight",
    type: "light",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/light/Firelight1.png",
      Tier2: "/phasmophobia-utils/assets/images/light/Firelight2.png",
      Tier3: "/phasmophobia-utils/assets/images/light/Firelight3.png",
    },
    min: 1,
    max: 3,
    linked: ["Igniter"],
  },

  // Main Items
  {
    name: "D.O.T.S. Projector",
    type: "main",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/main/D.O.T.S.Projector1.png",
      Tier2: "/phasmophobia-utils/assets/images/main/D.O.T.S.Projector2.png",
      Tier3: "/phasmophobia-utils/assets/images/main/D.O.T.S.Projector3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "EMF Reader",
    type: "main",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/main/EMFReader1.png",
      Tier2: "/phasmophobia-utils/assets/images/main/EMFReader2.png",
      Tier3: "/phasmophobia-utils/assets/images/main/EMFReader3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Ghost Writing Book",
    type: "main",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/main/GhostWritingBook1.png",
      Tier2: "/phasmophobia-utils/assets/images/main/GhostWritingBook2.png",
      Tier3: "/phasmophobia-utils/assets/images/main/GhostWritingBook3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Spirit Box",
    type: "main",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/main/SpiritBox1.png",
      Tier2: "/phasmophobia-utils/assets/images/main/SpiritBox2.png",
      Tier3: "/phasmophobia-utils/assets/images/main/SpiritBox3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Thermometer",
    type: "main",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/main/Thermometer1.png",
      Tier2: "/phasmophobia-utils/assets/images/main/Thermometer2.png",
      Tier3: "/phasmophobia-utils/assets/images/main/Thermometer3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "UV Light",
    type: "main",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/main/UVLight1.png",
      Tier2: "/phasmophobia-utils/assets/images/main/UVLight2.png",
      Tier3: "/phasmophobia-utils/assets/images/main/UVLight3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Video Camera",
    type: "main",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/main/VideoCamera1.png",
      Tier2: "/phasmophobia-utils/assets/images/main/VideoCamera2.png",
      Tier3: "/phasmophobia-utils/assets/images/main/VideoCamera3.png",
    },
    min: 1,
    max: 3,
    linked: ["Tripod"],
  },

  // Optional Items
  {
    name: "Crucifix",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/Crucifix1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/Crucifix2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/Crucifix3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Igniter",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/Igniter1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/Igniter2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/Igniter3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Incense",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/Incense1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/Incense2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/Incense3.png",
    },
    min: 1,
    max: 3,
    linked: ["Igniter"],
  },
  {
    name: "Motion Sensor",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/MotionSensor1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/MotionSensor2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/MotionSensor3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Parabolic Microphone",
    type: "optional",
    images: {
      Tier1:
        "/phasmophobia-utils/assets/images/optional/ParabolicMicrophone1.png",
      Tier2:
        "/phasmophobia-utils/assets/images/optional/ParabolicMicrophone2.png",
      Tier3:
        "/phasmophobia-utils/assets/images/optional/ParabolicMicrophone3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Photo Camera",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/PhotoCamera1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/PhotoCamera2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/PhotoCamera3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Salt",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/Salt1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/Salt2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/Salt3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Sanity Medication",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/SanityMedication1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/SanityMedication2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/SanityMedication3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Sound Sensor",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/SoundSensor1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/SoundSensor2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/SoundSensor3.png",
    },
    min: 1,
    max: 3,
  },
  {
    name: "Tripod",
    type: "optional",
    images: {
      Tier1: "/phasmophobia-utils/assets/images/optional/Tripod1.png",
      Tier2: "/phasmophobia-utils/assets/images/optional/Tripod2.png",
      Tier3: "/phasmophobia-utils/assets/images/optional/Tripod3.png",
    },
    min: 1,
    max: 3,
  },
];

export const mainItems = itemData.filter((item) => item.type === "main");
export const optionalItems = itemData.filter(
  (item) => item.type === "optional"
);
export const lightItems = itemData.filter((item) => item.type === "light");
