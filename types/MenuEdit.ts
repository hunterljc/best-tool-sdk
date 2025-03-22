// 编辑类型
export interface IMenuEdit {
  Name: string;
  Version: number;
  MainEdit: {
    Edits: IEdit[];
  };
  MainDisplay: {
    Text: IText[];
    Desc: string;
  };
}

export interface IEdit {
  EditType: number;
  TextType: number;
  Desc: string;
  Item?: IEditItem[];
}

export interface IEditItem {
  Caption: string;
  Value: number;
}

interface IText {
  Font: number;
  DisplayString: string;
}
