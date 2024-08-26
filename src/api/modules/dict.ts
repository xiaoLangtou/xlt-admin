/**
 * @description 字典管理相关接口
 */
import http from "@/api";
import { Dict } from "@/api/interface/dict";

/**
 * @description 获取字典列表
 * @param {string}  name 字典名称或者字典编码
 */
export const getDictList = (name?: string) => {
  return http.get<Dict.IDictType[]>("/dict/list", { name }, { loading: false });
};

/**
 * @description 添加字典
 * @param {Dict.IDictType}  data 字典数据
 * @param {string}  data.dictName 字典名称
 * @param {string}  data.dictCode 字典编码
 * @param {string}  data.dictDesc 字典描述
 * @param {string}  data.systemFlag 系统标识
 */
export const addDict = (data: Dict.IDictType) => {
  return http.post("/dict/add", data);
};

/**
 * @description 更新字典
 * @param {Dict.IDictType}  data 字典数据
 * @param {string}  data.dictName 字典名称
 * @param {string}  data.dictCode 字典编码
 * @param {string}  data.dictDesc 字典描述
 * @param {string}  data.systemFlag 系统标识
 * @param {string}  data.id 字典ID
 */
export const updateDict = (data: Dict.IDictType) => {
  return http.post("/dict/update", data);
};

/**
 * @description 删除字典
 * @param {number} id 字典ID
 */
export const removeDict = (id: any) => {
  return http.delete(`/dict/remove/${id}`);
};

/**
 * @description 获取字典详情
 * @param {number} id 字典ID
 */
export const getDictDetail = (id: any) => {
  return http.get(`/dict/detail/${id}`);
};

/**
 * @description 获取字典数据列表
 * @param {number} dictTypeId 字典类型ID
 * @param {number} current 当前页
 * @param {number} size 每页条数
 */
export const getDictDataList = (dictTypeId: number, current: number, size: number) => {
  return http.get<Dict.IDictData[]>("/dict/data/list", { dictTypeId, current, size }, { loading: false });
};

/**
 * @description 添加字典数据
 * @param {Dict.IDictData}  data 字典数据
 * @param {string}  data.dictValue 字典值
 * @param {string}  data.dictLabel 字典标签
 * @param {string}  data.dictRemark 字典备注
 * @param {number}  data.dictSort 字典排序
 * @param {number}  data.dictTypeId 字典类型ID
 */
export const addDictData = (data: Dict.IDictData) => {
  return http.post("/dict/data/add", data);
};

/**
 * @description 更新字典数据
 * @param {Dict.IDictData}  data 字典数据
 * @param {string}  data.dictValue 字典值
 * @param {string}  data.dictLabel 字典标签
 * @param {string}  data.dictRemark 字典备注
 * @param {number}  data.dictSort 字典排序
 * @param {number}  data.dictTypeId 字典类型ID
 * @param {number}  data.id 字典数据ID
 */
export const updateDictData = (data: Dict.IDictData) => {
  return http.post("/dict/data/update", data);
};

/**
 * @description 删除字典数据
 * @param {number} id 字典数据ID
 */
export const removeDictData = (id: any) => {
  return http.delete(`/dict/data/remove/${id}`);
};
