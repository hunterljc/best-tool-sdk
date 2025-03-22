// 【配置文件】—— 接口板配置
export interface IKeyBoard {
  Name: string;
  Version: number;
  Password: IPassword;
  MainShortCut: IMainShortCut;
  MainPage: IMainPage;
  MainMenu: IMainMenu;
}

// =============================Password======================

export interface IPassword {
  Defaults: IPasswordItem[];
  Customs: IPasswordItem[];
}

export interface IPasswordItem {
  Level: number;
  Password: string;
}
// =============================MainShortCut======================

export interface IMainShortCut {
  UIShortCuts: IUIShortCut[];
  ActivityShortCuts: IActivityShortCut[];
}
export interface IUIShortCut {
  Key: number;
  MenuType: number;
  ID: number;
  PressType: number;
  Desc: string;
}
export interface IActivityShortCut {
  Caption: string;
  Key: number;
  MenuType: number;
  ID: number;
  PressType: number;
  ActivityName: string;
  Desc: string;
}

// ==============================MainPage=============================
//菜单配置主界面
export interface IMainPage {
  StatusBarHight: number;
  StatusBarFont: number;
  Pages: IMenuPages[];
}

//菜单配置界面
export interface IMenuPages {
  ID: number;
  UpPageID: number;
  DownPageID: number;
  DisplayStatusBar: boolean;
  Splitter: boolean;
  Boarder: boolean;
  BoarderLineWidth: number;
  BoarderLeft: number;
  BoarderTop: number;
  BoarderBottom: number;
  BoarderRight: number;
  Elements: IMenuElements[];
}
/**
 * 用于可视化的变量
 * @param X-Y 每个菜单具备唯一的下x，y,依据X、Y匹配菜单
 * @param Desc 数据点中文名
 * @param ModelName 数据点英文别名
 * @param FieldName 数据点类型英文别名
 * @param EditType 数据点类型值
 */
//菜单配置数据点
export interface IMenuElements {
  Text: string;
  TextType: number;
  BindTextPos: number;
  Font: number;
  EditType: number;
  ModelName: string;
  FieldName: string;
  X: number;
  Y: number;
  Desc: string;
}
// ==============================MainMenu=============================
export interface IMainMenu {
  MaxRowNum: number;
  Font: number;
  Menus: IMenu[];
}

export interface IMenu {
  Menu: number;
  Items: IMenuItem[];
  Desc: string;
}
export interface IMenuItem {
  Text: string;
  Type: number;
  ParentID: number;
  SubID: number;
  PageID: number;
  Font: number;
  EditType: number;
  ModelName: string;
  FieldName: string;
  IsNeedPwd: number;
  ActivityName: string;
}
