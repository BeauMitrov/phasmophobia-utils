import { itemData } from "../components/templates/ItemsTemplate";

export const getMainItems = () => {
  return itemData.filter((item) => item.type === "main");
};

export const getOptionalItems = () => {
  return itemData.filter((item) => item.type === "optional");
};

export const getLightItems = () => {
  return itemData.filter((item) => item.type === "light");
};
