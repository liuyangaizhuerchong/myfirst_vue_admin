import { get, post, put, del } from '@/utils/request'
/**
 * 轮播图列表
 * @param {*} per 数量
 * @param {*} page 页数
 * @returns
 */
export const listCategoryApi = (params) =>
  get('/api/v1/admin/bannercategory', params)
/**
 * 轮播图新增
 * @param {*} data
 * @returns
 */
export const newAddProductApi = (data) =>
  post('/api/v1/admin/bannercategory', data)
/**
 * 轮播图修改
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const putProductApi = (id, data) =>
  put(`/api/v1/admin/bannercategory/${id}`, data)
/**
 * 轮播图删除
 * @param {*} id
 * @returns
 */
export const delProductApi = (id) => del(`/api/v1/admin/bannercategory/${id}`)
/**
 * 根据id获取轮播图信息
 * @param {*} id
 * @returns
 */
export const oneProductIdApi = (id) => get(`/api/v1/admin/bannercategory/${id}`)
