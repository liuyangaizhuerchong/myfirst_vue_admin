import { get, post, put, del } from '@/utils/request'
/**
 * 商品列表
 * @param {*} per 数量
 * @param {*} page 页数
 * @returns
 */
export const listProductApi = (params) => get('/api/v1/admin/product', params)
/**
 * 商品新增
 * @param {*} data
 * @returns
 */
export const newAddProductApi = (data) => post('/api/v1/admin/product', data)
/**
 * 商品修改
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const putProductApi = (id, data) =>
  put(`/api/v1/admin/product/${id}`, data)
/**
 * 商品删除
 * @param {*} id
 * @returns
 */
export const delProductApi = (id) => del(`/api/v1/admin/product/${id}`)
/**
 * 根据id获取商品信息
 * @param {*} id
 * @returns
 */
export const oneProductIdApi = (id) => get(`/api/v1/admin/product/${id}`)
