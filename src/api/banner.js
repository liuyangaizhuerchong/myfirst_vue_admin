import { get, post, put, del } from '@/utils/request'
/**
 * 轮播图列表
 * @param {*} per 数量
 * @param {*} page 页数
 * @returns
 */
export const listProductApi = (params) => get('/api/v1/admin/banner', params)
/**
 * 轮播图新增
 * @param {*} data
 * @returns
 */
export const newAddProductApi = (data) => post('/api/v1/admin/banner', data)
/**
 * 轮播图修改
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const putProductApi = (id, data) =>
  put(`/api/v1/admin/banner/${id}`, data)
/**
 * 轮播图删除
 * @param {*} id
 * @returns
 */
export const delProductApi = (id) => del(`/api/v1/admin/banner/${id}`)
/**
 * 根据id获取轮播图信息
 * @param {*} id
 * @returns
 */
export const oneProductIdApi = (id) => get(`/api/v1/admin/banner/${id}`)
