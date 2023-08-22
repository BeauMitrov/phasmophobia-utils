interface TierUnlock {
  unlockLevel: number;
  unlockTier: number;
}

interface ItemUnlockData {
  name: string;
  unlocks: TierUnlock[];
}

export const unlockLevels: ItemUnlockData[] = [
  {
    name: "Flashlight",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 19, unlockTier: 2 },
      { unlockLevel: 35, unlockTier: 3 },
    ],
  },
  {
    name: "Head Gear",
    unlocks: [
      // { unlockLevel: 13, unlockTier: 1 },
      { unlockLevel: 49, unlockTier: 2 },
      { unlockLevel: 82, unlockTier: 3 },
    ],
  },
  {
    name: "Firelight",
    unlocks: [
      { unlockLevel: 12, unlockTier: 1 },
      { unlockLevel: 47, unlockTier: 2 },
      { unlockLevel: 79, unlockTier: 3 },
    ],
  },

  {
    name: "D.O.T.S. Projector",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 29, unlockTier: 2 },
      { unlockLevel: 60, unlockTier: 3 },
    ],
  },
  {
    name: "EMF Reader",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 20, unlockTier: 2 },
      { unlockLevel: 52, unlockTier: 3 },
    ],
  },
  {
    name: "Ghost Writing Book",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 23, unlockTier: 2 },
      { unlockLevel: 63, unlockTier: 3 },
    ],
  },
  {
    name: "Spirit Box",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 27, unlockTier: 2 },
      { unlockLevel: 54, unlockTier: 3 },
    ],
  },
  {
    name: "Thermometer",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 36, unlockTier: 2 },
      { unlockLevel: 64, unlockTier: 3 },
    ],
  },
  {
    name: "UV Light",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 21, unlockTier: 2 },
      { unlockLevel: 56, unlockTier: 3 },
    ],
  },
  {
    name: "Video Camera",
    unlocks: [
      { unlockLevel: 1, unlockTier: 1 },
      { unlockLevel: 33, unlockTier: 2 },
      { unlockLevel: 61, unlockTier: 3 },
    ],
  },

  {
    name: "Crucifix",
    unlocks: [
      { unlockLevel: 8, unlockTier: 1 },
      { unlockLevel: 37, unlockTier: 2 },
      { unlockLevel: 90, unlockTier: 3 },
    ],
  },
  {
    name: "Igniter",
    unlocks: [
      { unlockLevel: 12, unlockTier: 1 },
      { unlockLevel: 41, unlockTier: 2 },
      { unlockLevel: 57, unlockTier: 3 },
    ],
  },
  {
    name: "Incense",
    unlocks: [
      { unlockLevel: 14, unlockTier: 1 },
      { unlockLevel: 42, unlockTier: 2 },
      { unlockLevel: 85, unlockTier: 3 },
    ],
  },
  {
    name: "Motion Sensor",
    unlocks: [
      { unlockLevel: 5, unlockTier: 1 },
      { unlockLevel: 45, unlockTier: 2 },
      { unlockLevel: 74, unlockTier: 3 },
    ],
  },
  {
    name: "Parabolic Microphone",
    unlocks: [
      { unlockLevel: 7, unlockTier: 1 },
      { unlockLevel: 31, unlockTier: 2 },
      { unlockLevel: 72, unlockTier: 3 },
    ],
  },
  {
    name: "Photo Camera",
    unlocks: [
      { unlockLevel: 3, unlockTier: 1 },
      { unlockLevel: 25, unlockTier: 2 },
      { unlockLevel: 70, unlockTier: 3 },
    ],
  },
  {
    name: "Salt",
    unlocks: [
      { unlockLevel: 9, unlockTier: 1 },
      { unlockLevel: 43, unlockTier: 2 },
      { unlockLevel: 68, unlockTier: 3 },
    ],
  },
  {
    name: "Sanity Medication",
    unlocks: [
      { unlockLevel: 16, unlockTier: 1 },
      { unlockLevel: 39, unlockTier: 2 },
      { unlockLevel: 77, unlockTier: 3 },
    ],
  },
  {
    name: "Sound Sensor",
    unlocks: [
      { unlockLevel: 11, unlockTier: 1 },
      { unlockLevel: 32, unlockTier: 2 },
      { unlockLevel: 58, unlockTier: 3 },
    ],
  },
  {
    name: "Tripod",
    unlocks: [
      { unlockLevel: 10, unlockTier: 1 },
      { unlockLevel: 34, unlockTier: 2 },
      { unlockLevel: 62, unlockTier: 3 },
    ],
  },
];
