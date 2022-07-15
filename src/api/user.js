import request, { post } from '@/utils/request'

export function login(data) {
  /* return request({
    url: '/api/v1/auth/manager_login',
    method: 'post',
    data
  }) */
  return post('/api/v1/auth/manager_login', data)
}

export function getInfo() {
  return request({
    url: '/api/v1/auth/manager_info',
    method: 'get'
  })
}
