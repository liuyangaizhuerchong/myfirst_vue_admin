import request, { get, post, put, del } from '@/utils/request'
/**
 * 登录
 * @param {*} data
 * @returns
 */
export function login(data) {
  return post('/api/v1/auth/manager_login', data)
}
/**
 * 获取登录权限
 * @returns
 */
export function getInfo() {
  return request({
    url: '/api/v1/auth/manager_info',
    method: 'get'
  })
}
/**
 * 用户列表
 * @param {*} per 数量
 * @param {*} page 页数
 * @returns
 */
export const listUserApi = (params) => get('/api/v1/admin/user', params)
/**
 * 用户新增
 * @param {*} data
 * @returns
 */
export const newAddUserApi = (data) => post('/api/v1/admin/user', data)
/**
 * 用户修改
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const putUserApi = (id, data) => put(`/api/v1/admin/user/${id}`, data)
/**
 * 用户删除
 * @param {*} id
 * @returns
 */
export const delUserApi = (id) => del(`/api/v1/admin/user/${id}`)
/**
 * 根据id获取用户信息
 * @param {*} id
 * @returns
 */
export const oneUserApi = (id) => get(`/api/v1/admin/user/${id}`)
