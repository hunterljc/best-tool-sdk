export interface IResourceInfoItem {
  res_id: string;
  res_name: string;
  res_type: string;
  res_uri: string;
  node_alias: string;
  node_desc: string;
  node_model: string;
  node_code: string;
  sortcode: string;
  res_property_id: string;
  img_path: string;
  programs: Array<IConfigLibary>;
  config_libary: Array<IConfigLibary>;
}

export interface IConfigLibary {
  checked: boolean;
  res_id: string;
  res_name: string;
  res_type: string;
  res_uri: string;
  res_property_id: string;
  res_desc: string;
  config_alias?: string;
  maintain_type: string;
  sortcode: string;
  file: null | IFileRaw;
  device_type?: string;
  fileName: string;
  version: string;
  md5: string;
}

interface IFileRaw {
  raw: null;
  size: number;
}

export interface IQueryNodeInfo {
  code: string;
  tableName: string;
  message: string;
  res: Array<INodeInfo>;
}

export interface INodeInfo {
  node_alias: string;
  node_code: string;
  node_desc: string;
  node_id: string;
  node_model: string;
  res_type_id: string;
  res_type_name: string;
  sortcode: string;
}

export interface IQueryModulesResource {
  code: string;
  tableName: string;
  message: string;
  res: Array<IModulesResourceo>;
}

export interface IModulesResourceo {
  code: string;
  module_alias: string;
  module_desc: string;
  module_id: string;
  module_index: string;
  module_model: string;
  module_role: string;
  module_uri: string;
  res_type_id: string;
  res_type_name: string;
  sortcode: string;
}

export interface IQueryNodeConfig {
  code: string;
  tableName: string;
  message: string;
  res: Array<INodeConfig>;
}

export interface INodeConfig {
  config_alias: string;
  config_desc: string;
  config_id: string;
  config_key: string;
  config_name: string;
  config_uri: string;
  res_type_id: string;
  res_type_name: string;
  sortcode: string;
}
export interface IQueryNodeAppOS {
  code: string;
  tableName: string;
  message: string;
  res: Array<INodeAppOS>;
}

export interface INodeAppOS {
  app_alias: string;
  app_desc: string;
  app_id: string;
  app_name: string;
  app_uri: string;
  code: string;
  res_type_id: string;
  res_type_name: string;
  sortcode: string;
}

export interface IResourceTreeItem {
  os_desc: string;
  res_double_ref: string;
  res_id: string;
  res_name: string;
  res_property_id: string;
  res_ref: string;
  res_type: string;
  res_desc?: string;
  res_uri: string;
  sortcode: string;
  system_id: string;
  system_name: string;
  maintain_type?: string;
}
