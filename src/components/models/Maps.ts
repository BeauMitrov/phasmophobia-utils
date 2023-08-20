export interface Map {
  name: string;
  type: "amateur" | "intermediate" | "professional" | "nightmare" | "insanity";
  image: string;
}

export const mapData: Map[] = [
  {
    name: "6 Tanglewood Drive",
    type: "amateur",
    image: "/phasmophobia-utils/assets/images/maps/Tanglewood.png",
  },

  {
    name: "13 Willow Drive",
    type: "amateur",
    image: "/phasmophobia-utils/assets/images/maps/Willow.png",
  },

  {
    name: "42 Edgefield Road",
    type: "intermediate",
    image: "/phasmophobia-utils/assets/images/maps/Edgefield.png",
  },

  {
    name: "10 Ridgeview Court",
    type: "intermediate",
    image: "/phasmophobia-utils/assets/images/maps/Ridgeview.png",
  },

  {
    name: "Grafton Farmhouse",
    type: "professional",
    image: "/phasmophobia-utils/assets/images/maps/Grafton.png",
  },

  {
    name: "Bleasdale Farmhouse",
    type: "professional",
    image: "/phasmophobia-utils/assets/images/maps/Bleasdale.png",
  },

  {
    name: "Camp Woodwind",
    type: "professional",
    image: "/phasmophobia-utils/assets/images/maps/CampWoodwind.png",
  },

  {
    name: "Maple Lodge Campsite",
    type: "nightmare",
    image: "/phasmophobia-utils/assets/images/maps/MapleLodgeCampsite.png",
  },

  {
    name: "Prison",
    type: "nightmare",
    image: "/phasmophobia-utils/assets/images/maps/Prison.png",
  },

  {
    name: "Brownstone High School",
    type: "nightmare",
    image: "/phasmophobia-utils/assets/images/maps/Highschool.png",
  },

  {
    name: "Sunny Meadows",
    type: "insanity",
    image: "/phasmophobia-utils/assets/images/maps/SunnyMeadows.png",
  },

  {
    name: "Sunny Meadows Restricted",
    type: "insanity",
    image: "/phasmophobia-utils/assets/images/maps/SunnyMeadowsRestricted.png",
  },
];
