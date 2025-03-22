import { Menu, MenuItemConstructorOptions } from "electron";

export const setupMenu = () => {
  const menuOption: MenuItemConstructorOptions[] = [];

  const handleOption = Menu.buildFromTemplate(menuOption);

  Menu.setApplicationMenu(handleOption);
};
