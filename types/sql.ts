export interface IQueryParam {
  pageSize: string;
  pageNum: string;
  order: number;
  orderString: string;
  type?: string;
  typelist?: string;
}

export interface IQueryParamData {
  dataName: string;
  idName: string;
  id: string;
}

export interface IQueryFuzzy {
  dataName: string;
  system_id: string;
  pageSize: number;
  pageNum: number;
  value: string;
}

export interface IQueryMax {
  str: string;
  dataName: string;
  value?: string;
}

export interface IcheckString {
  dataName: string;
  dataString: string;
  value?: string;
}
