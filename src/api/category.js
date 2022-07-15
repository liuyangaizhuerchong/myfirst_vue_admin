import { get, post, put, del } from '@/utils/request'
/**
 * 查询1000条分类数据
 * @returns
 */
export const modelAllCategoryApi = () =>
  get('/api/v1/admin/productcategory', { per: 1000 })
/**
 * 分类
 * @param {*} per
 * @param {*} page
 * @returns
 */
export const modelListApi = (params) =>
  get('/api/v1/admin/productcategory', params)
/**
 * 新增
 * @param {*} data
 * @returns
 */
export const modelAddApi = (data) => post('/api/v1/admin/productcategory', data)
/**
 * 修改
 * @param {*} id 商品id
 * @param {*} data
 * @returns
 */
export const modelModifyApi = (id, data) =>
  put(`/api/v1/admin/productcategory/${id}`, data)
/**
 * 删除
 * @param {*} id
 * @returns
 */
export const modelDelApi = (id) => del(`/api/v1/admin/productcategory/${id}`)
/**
 * 根据id查看分类详情
 * @param {*} id
 * @returns
 */
export const modelOneCategoryApi = (id) =>
  get(`/api/v1/admin/productcategory/${id}`)
