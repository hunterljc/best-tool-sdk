/**
 * 自动动作阶段
 */
export const ActAutoStages = {
  tableName: "dict_support_act_auto_stages_ZE0705",
  filedNames: [
    "stage_id",
    "stage_name",
    "stage_alias",
    "stage_desc",
    "stage_code",
    "action_id",
    "action_name",
    "sortcode",
    "system_id",
    "del_flag"
  ]
};

/**
 *
 */
export const ActConfigEnum = {
  tableName: "dict_support_act_config_enum_ZE0705",
  filedNames: [
    "item_id",
    "system_id",
    "item_name",
    "item_alias",
    "item_value",
    "item_desc",
    "item_parent_ids",
    "parent_id",
    "del_flag",
    "sortcode"
  ]
};

/**
 *
 */
export const ActConfigType = {
  tableName: "dict_support_act_config_type_ZE0705",
  filedNames: [
    "config_id",
    "config_name",
    "config_alias",
    "config_desc",
    "del_flag",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const ActEvents = {
  tableName: "dict_support_act_events_ZE0705",
  filedNames: [
    "event_id", // 事件id
    "event_name", // 事件名称
    "event_alias", // 事件别名
    "event_shield_type", // 事件辅助类型
    "event_desc", // 事件描述
    "event_type", // 事件类型
    "event_expression", //表达式
    "strategy_id", //策略id
    "item_id",
    "sortcode", // 排序
    "del_flag",
    "system_id"
  ]
};

/**
 *
 */
export const ActStrategy = {
  tableName: "dict_support_act_strategy_ZE0705",
  filedNames: [
    "strategy_id",
    "strategy_name",
    "strategy_alias",
    "strategy_desc",
    "strategy_type",
    "item_id",
    "extra_data",
    "del_flag",
    "sortcode",
    "system_id"
  ]
};

/**
 *
 */
export const ActVariable = {
  tableName: "dict_support_act_variable_ZE0705",
  filedNames: [
    "var_id",
    "var_name",
    "var_alias",
    "var_desc",
    "var_type",
    "min_value",
    "max_value",
    "default_value",
    "sortcode",
    "del_flag",
    "system_id"
  ]
};

/**
 *
 */
export const AutoAct = {
  tableName: "dict_support_auto_act_ZE0705",
  filedNames: [
    "action_id",
    "action_name",
    "action_alias",
    "action_code",
    "action_desc",
    "equipment_type_id",
    "equipment_type_name",
    "prerequisite_expression",
    "action_color",
    "sortcode",
    "del_flag",
    "system_id"
  ]
};

/**
 *
 */
export const BasicAct = {
  tableName: "dict_support_basic_act_ZE0705",
  filedNames: [
    "action_id",
    "action_name",
    "action_alias",
    "action_code",
    "action_type",
    "widget_id",
    "widget_name",
    "action_desc",
    "action_color",
    "sortcode",
    "del_flag",
    "system_id"
  ]
};

/**
 *
 */
export const EquipmentType = {
  tableName: "dict_equipment_type_ZE0705",
  filedNames: [
    "equipment_type_id",
    "equipment_type_name",
    "equipment_type_alias",
    "equipment_type_code",
    "equipment_type_desc",
    "equipment_type_parent_id",
    "sortcode"
  ]
};

/**
 *
 */
export const SupportParts = {
  tableName: "dict_support_parts_ZE0705",
  filedNames: [
    "widget_id",
    "widget_code",
    "widget_name",
    "widget_alias",
    "widget_desc",
    "equipment_type_id",
    "widget_img",
    "sortcode"
  ]
};

/**
 *
 */
export const deviceSpec = {
  tableName: "dict_device_spec",
  filedNames: [
    "device_spec_id",
    "device_spec_name",
    "firm_id",
    "firm_name",
    "res_type_id",
    "res_type_name",
    "port_type_id",
    "port_type_name",
    "device_spec_signal_min",
    "device_spec_signal_max",
    "device_spec_baudrate",
    "device_spec_img",
    "sortcode"
  ]
};

/**
 *
 */
export const DictFirm = {
  tableName: "dict_firm",
  filedNames: ["firm_id", "firm_name", "firm_alias", "firm_code", "sortcode"]
};

/**
 *
 */
export const imgPurpose = {
  tableName: "dict_img_purpose",
  filedNames: ["purpose_id", "purpose_name", "purpose_alias", "purpose_desc", "sortcode"]
};

/**
 *
 */
export const PortType = {
  tableName: "dict_port_type",
  filedNames: [
    "port_type_id",
    "port_type_name",
    "port_type_alias",
    "port_type_desc",
    "port_type_code",
    "sortcode"
  ]
};

/**
 *
 */
export const sysImgRes = {
  tableName: "sys_img_res",
  filedNames: [
    "img_id",
    "img_path",
    "purpose_id",
    "purpose_name",
    "img_type",
    "project_id",
    "project_name"
  ]
};

/**
 *
 */
export const LocalParams = {
  tableName: "dict_system_local_params",
  filedNames: ["id", "name", "desc", "type", "expression", "system_id", "sortcode"]
};

/**
 *
 */
export const paramsGlobal = {
  tableName: "dict_system_contorl_params_ZE0705",
  filedNames: [
    "param_id",
    "param_name",
    "param_alias",
    "param_scope_type",
    "param_type_id",
    "min_value",
    "max_value",
    "default_value",
    "param_desc",
    "sortcode"
  ]
};

/**
 *
 */
export const paramsStyle = {
  tableName: "dict_params_type_ZE0705",
  filedNames: [
    "params_type_id",
    "params_type_name",
    "params_type_alias",
    "params_type_code",
    "sortcode"
  ]
};

/**
 *
 */
export const SysProject = {
  tableName: "sys_project",
  filedNames: [
    "project_id",
    "project_name",
    "project_desc",
    "project_res",
    "assort_id",
    "assort_name",
    "system_id",
    "system_name",
    "create_time",
    "author",
    "sortcode"
  ]
};

export const SysProjectRes = {
  tableName: "sys_project_res"
};
export const SysProjectResProperty = {
  tableName: "sys_project_res_property"
};

/**
 *
 */
export const SysProjectConfig = {
  tableName: "sys_project_config",
  filedNames: [
    "config_template_id",
    "config_template_name",
    "config_template_desc",
    "res_id",
    "config_id",
    "config_name",
    "config_file_path",
    "config_version",
    "system_id",
    "system_name",
    "project_id",
    "project_name",
    "sortcode"
  ]
};

/**
 *
 */
export const KeyBoard = {
  tableName: "dict_keyboard",
  filedNames: ["key_id", "key_name", "key_alias", "key_value", "key_desc", "system_id", "sortcode"]
};

/**
 *
 */
export const KeyBoardScope = {
  tableName: "dict_keyboard_scope",
  filedNames: [
    "key_scope_id",
    "key_scope_name",
    "key_scope_alias",
    "key_scope_value",
    "key_scope_desc",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const KeyBoardType = {
  tableName: "dict_keyboard_type",
  filedNames: [
    "key_type_id",
    "key_type_name",
    "key_type_alias",
    "key_type_value",
    "key_type_desc",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const SupportAreaType = {
  tableName: "dict_support_area_type",
  filedNames: [
    "support_type_id",
    "support_type_name",
    "support_type_alias",
    "support_type_value",
    "support_type_desc",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const SupportScope = {
  tableName: "dict_support_scope",
  filedNames: [
    "support_scope_id",
    "support_scope_name",
    "support_scope_alias",
    "support_scope_value",
    "support_scope_desc",
    "support_type_id",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const AutoArea = {
  tableName: "dict_auto_area",
  filedNames: [
    "area_id",
    "area_name",
    "area_alias",
    "area_process_type",
    "area_desc",
    "area_type",
    "area_expression",
    "strategy_id",
    "area_activitie_id",
    "group_auto_id",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const autoAreaActivite = {
  tableName: "dict_auto_area_activitie",
  filedNames: [
    "area_activitie_id",
    "area_activitie_name",
    "area_activitie_alias",
    "area_activitie_code",
    "enable",
    "enable_value_type",
    "start_time",
    "keep_time",
    "system_id",
    "sortcode"
  ]
};

/**
 * 区域字典
 */
export const AutoAreaType = {
  tableName: "dict_auto_area_type",
  filedNames: [
    "area_type_id",
    "area_type_name",
    "area_type_alias",
    "area_type_desc",
    "area_type_value",
    "system_id",
    "sortcode"
  ]
};

/**
 * 区域类型字典
 */
export const AutoAutosType = {
  tableName: "dict_auto_autos_type",
  filedNames: [
    "autos_type_id",
    "autos_type_name",
    "autos_type_alias",
    "autos_type_value",
    "autos_type_desc",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const AutoEvent = {
  tableName: "dict_auto_event",
  filedNames: [
    "event_id",
    "event_name",
    "event_alias",
    "event_desc",
    "auto_types",
    "trigger_position",
    "event_expression",
    "area_id",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const AutoEventType = {
  tableName: "dict_auto_event_type",
  filedNames: [
    "event_type_id",
    "event_type_name",
    "event_type_alias",
    "event_type_desc",
    "event_type_value",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const AutoProcess = {
  tableName: "dict_auto_processes",
  filedNames: [
    "auto_process_id",
    "auto_process_name",
    "auto_process_alias",
    "auto_process_desc",
    "system_id",
    "sortcode"
  ]
};

/**
 *
 */
export const AutoStages = {
  tableName: "dict_auto_stages",
  filedNames: [
    "stage_id",
    "stage_name",
    "stage_alias",
    "stage_desc",
    "start_addr",
    "last_addr",
    "stage_expression",
    "forward_position",
    "enable",
    "stage_json_id",
    "system_id",
    "sortcode"
  ]
};

/**
 * 阶段实例
 */
export const AutoStagesInstantiation = {
  tableName: "dict_auto_stages_instantiation",
  filedNames: [
    "stages_instantiation_id",
    "stage_id",
    "stages_instantiation_name",
    "stages_instantiation_alias",
    "stages_instantiation_variable",
    "next_stage_id",
    "system_id",
    "sortcode",
    "auto_process_id"
  ]
};

/**
 * 区域策略字典
 */
export const AutoStrategies = {
  tableName: "dict_auto_strategies",
  filedNames: [
    "strategy_id",
    "strategy_name",
    "strategy_alias",
    "strategy_desc",
    "interval_time",
    "sliding",
    "strategy_type_id",
    "interval_time_value_type",
    "interval_num",
    "sliding_value_type",
    "sliding_max_num",
    "step_num",
    "dir",
    "only_once",
    "action_time_out",
    "system_id",
    "sortcode"
  ]
};

/**
 * 策略类型字典
 */
export const AutoStrategyType = {
  tableName: "dict_auto_strategy_type",
  filedNames: [
    "strategy_type_id",
    "strategy_type_name",
    "strategy_type_alias",
    "strategy_type_value",
    "strategy_type_desc",
    "system_id",
    "sortcode"
  ]
};

/**
 * 变量类型字典
 */
export const AutoVariableType = {
  tableName: "dict_auto_variable_type",
  filedNames: [
    "variable_type_id",
    "variable_type_name",
    "variable_type_alias",
    "variable_type_value",
    "variable_type_desc",
    "system_id",
    "sortcode"
  ]
};

/**
 * 成组定义字典
 */
export const groupAutosService = {
  tableName: "dict_group_autos",
  filedNames: [
    "group_auto_id",
    "group_auto_name",
    "group_auto_alias",
    "group_auto_desc",
    "group_auto_code",
    "system_id",
    "sortcode"
  ]
};

/**
 * 阶段工艺对照表
 */
export const StagesProcesses = {
  tableName: "dict_stages_processes",
  filedNames: ["id", "stage_id", "auto_process_id"]
};

/**
 * 外设属性配置模型
 */
export const DeviceProperty = {
  tableName: "sys_device_property",
  filedNames: [
    "property_id",
    "system_type_id",
    "res_id",
    "device_model_id",
    "device_type_code",
    "device_spec_id",
    "port_id",
    "port_name",
    "port_index",
    "port_type_id",
    "port_type_name",
    "device_index",
    "device_uploadmainboardrule",
    "device_uploaddeviceboardrule",
    "port_baudrate",
    "device_range",
    "device_linktimeout",
    "sortcode"
  ]
};

/**
 * 端口故障开关模型
 */
export const PortFaults = {
  tableName: "dict_port_faults_ZE0705",
  filedNames: ["id", "name", "alias", "sortcode"]
};

/**
 * 模组属性模型
 */
export const PortProperty = {
  tableName: "sys_port_property",
  filedNames: [
    "system_type_id",
    "port_id",
    "port_enable",
    "port_shield_type",
    "port_fault",
    "port_alarm",
    "port_digitalsensor_profile",
    "port_analogsensor_profile",
    "port_extsensor_profile",
    "port_upload",
    "port_postureCfg",
    "port_faultInterval",
    "port_heartTimeout",
    "port_heartInterval"
  ]
};

/**
 * 数据屏蔽类型模型
 */
export const PortShieldtype = {
  tableName: "dict_port_shieldtype",
  filedNames: ["id", "name", "alias", "value", "sortcode"]
};

/**
 * 端口上报模型
 */
export const PortUpload = {
  tableName: "dict_port_uploadmodel_ZE0705",
  filedNames: ["id", "name", "alias", "value", "sortcode"]
};

/**
 * 端口预警字典
 */
export const PortWarns = {
  tableName: "dict_port_warns_ZE0705",
  filedNames: ["id", "name", "alias", "value", "sortcode"]
};

/**
 * 系统资源模型
 */
export const SysSystem = {
  tableName: "sys_system",
  filedNames: [
    "system_id",
    "system_name",
    "system_alias",
    "system_desc",
    "system_tree",
    "system_status",
    "create_time",
    "author",
    "publish_time",
    "publisher",
    "del_flag",
    "sortcode"
  ]
};
// /**
//  * SysSystem表的删除关联表仅有表名
//  */
// export const SysSystemRes = {
//     tableName: 'sys_system_res',
// }

/**
 * 外设模型
 */
export const deviceModel = {
  tableName: "dict_device_model",
  filedNames: [
    "device_model_id",
    "device_model_name",
    "device_model_alias",
    "device_model_uri",
    "res_type_id",
    "res_type_name",
    "res_type_code",
    "deivce_model_desc",
    "sortcode"
  ]
};

/**
 * 模组资源字典
 */
export const modulesResource = {
  tableName: "dict_module_resource",
  filedNames: [
    "module_id",
    "module_model",
    "module_alias",
    "module_index",
    "module_desc",
    "res_type_id",
    "res_type_name",
    "module_role",
    "module_uri",
    "code",
    "sortcode"
  ]
};

/**
 * app字典
 */
export const nodeApp = {
  tableName: "sys_node_app",
  filedNames: [
    "app_id",
    "app_name",
    "app_alias",
    "app_uri",
    "res_type_id",
    "res_type_name",
    "app_desc",
    "code",
    "sortcode"
  ]
};

/**
 * 配置字典
 */
export const NodeConfig = {
  tableName: "dict_node_config",
  filedNames: [
    "config_id",
    "config_name",
    "config_alias",
    "res_type_id",
    "res_type_name",
    "config_desc",
    "config_uri",
    "config_key",
    "sortcode"
  ]
};

/**
 * os字典
 */
export const nodeOs = {
  tableName: "sys_node_os",
  filedNames: [
    "os_id",
    "os_name",
    "os_alias",
    "os_uri",
    "res_type_id",
    "res_type_name",
    "os_desc",
    "code",
    "sortcode"
  ]
};

/**
 * 节点资源
 */
export const NodeResource = {
  tableName: "dict_node_resource",
  filedNames: [
    "node_id",
    "node_model",
    "node_alias",
    "res_type_id",
    "res_type_name",
    "node_desc",
    "node_code",
    "sortcode"
  ]
};

/**
 * 端口资源字典
 */
export const PortResource = {
  tableName: "dict_port_resource",
  filedNames: [
    "port_id",
    "module_id",
    "res_type_id",
    "res_type_name",
    "port_name",
    "port_index",
    "port_type_id",
    "port_uri",
    "port_desc",
    "sortcode"
  ]
};

/**
 * 节点资源类型
 */
export const ResourceType = {
  tableName: "dict_resource_type",
  filedNames: [
    "res_type_id",
    "res_type_name",
    "res_type_alias",
    "res_type_classify",
    "res_type_code",
    "res_type_uri",
    "res_type_desc",
    "sortcode"
  ]
};

/**
 * 系统节点配置
 */
export const SysNodeConfig = {
  tableName: "sys_node_config",
  filedNames: [
    "config_template_id",
    "config_template_name",
    "res_id",
    "config_id",
    "config_name",
    "config_template_desc",
    "config_version",
    "config_file_path",
    "system_id",
    "system_name",
    "author",
    "create_time",
    "publish_time",
    "publisher",
    "publish_status",
    "sortcode"
  ]
};

/**
 * 系统资源树模板
 */
export const SystemRes = {
  tableName: "sys_system_res",
  filedNames: [
    "res_id",
    "res_name",
    "res_uri",
    "res_type",
    "res_property_id",
    "res_ref",
    "res_double_ref",
    "system_id",
    "system_name",
    "sortcode"
  ]
};

/**
 * 系统资源树关联表
 */
export const sysAssort = {
  tableName: "sys_assort"
};

//菜单配置数据点表
export const menuDataPoint = {
  tableName: "dict_data_point_ZE0705"
};

//菜单配置数据点类型表
export const menugDataType = {
  tableName: "dict_data_point_type_ZE0705"
};
