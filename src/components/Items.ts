export interface Item {
    name: string;
    type: 'main' | 'optional' | 'light';
    image: string;
    min: number;
    max: number;
    linked?: string[];
}

export const itemData: Item[] = [

    // Main Items
    {
        name: "Video Camera",
        type: "main",
        image: "/phasmophobia-utils/assets/images/main/VideoCamera.png",
        min: 1,
        max: 3,
        linked: ["Tripod"]
    },
    {
        name: "D.O.T.S. Projector",
        type: "main",
        image: "/phasmophobia-utils/assets/images/main/DOTSProjector.png",
        min: 1,
        max: 3,
    },
    {
        name: "EMF Reader",
        type: "main",
        image: "/phasmophobia-utils/assets/images/main/EMFReader.png",
        min: 1,
        max: 3,
    },
    {
        name: "Ghost Writing Book",
        type: "main",
        image: "/phasmophobia-utils/assets/images/main/GhostWritingBook.png",
        min: 1,
        max: 3,
    },
    {
        name: "Spirit Box",
        type: "main",
        image: "/phasmophobia-utils/assets/images/main/Spiritbox.png",
        min: 1,
        max: 3,
    },
    {
        name: "UV Flashlight",
        type: "main",
        image: "/phasmophobia-utils/assets/images/main/UVFlashlight.png",
        min: 1,
        max: 3,
    },

    // Optional Items
    {
        name: "Photo Camera",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/PhotoCamera.png",
        min: 1,
        max: 3,
    },
    {
        name: "Crucifix",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/Crucifix.png",
        min: 1,
        max: 3,
    },
    {
        name: "Glowstick",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/Glowstick.png",
        min: 1,
        max: 3,
    },
    {
        name: "Head Mounted Camera",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional//HeadMountedCamera.png",
        min: 1,
        max: 3,
    },
    {
        name: "Lighter",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/Lighter.png",
        min: 1,
        max: 3,
    },
    {
        name: "Motion Sensor",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/MotionSensor.png",
        min: 1,
        max: 3,
    },
    {
        name: "Parabolic Microphone",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/ParabolicMicrophone.png",
        min: 1,
        max: 3,
    },
    {
        name: "Salt Shaker",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/SaltShaker.png",
        min: 1,
        max: 3,
    },
    {
        name: "Sanity Pills",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/SanityPills.png",
        min: 1,
        max: 3,
    },
    {
        name: "Smudge Sticks",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/SmudgeSticks.png",
        min: 1,
        max: 3,
        linked: ["Lighter"]
    },
    {
        name: "Sound Sensor",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/SoundSensor.png",
        min: 1,
        max: 3,
    },
    {
        name: "Thermometer",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/Thermometer.png",
        min: 1,
        max: 3,
    },
    {
        name: "Tripod",
        type: "optional",
        image: "/phasmophobia-utils/assets/images/optional/Tripod.png",
        min: 1,
        max: 3,
    },

    // Lights
    {
        name: "Strong Flashlight",
        type: "light",
        image: "/phasmophobia-utils/assets/images/light/StrongFlashlight.png",
        min: 1,
        max: 3,
    },
    {
        name: "Flashlight",
        type: "light",
        image: "/phasmophobia-utils/assets/images/light/Flashlight.png",
        min: 1,
        max: 3,
    },
    {
        name: "Candle",
        type: "light",
        image: "/phasmophobia-utils/assets/images/light/Candle.png",
        min: 1,
        max: 3,
        linked: ["Lighter"]
    },
];

export const mainItems = itemData.filter(item => item.type === "main");
export const optionalItems = itemData.filter(item => item.type === "optional");
export const lightItems = itemData.filter(item => item.type === "light");