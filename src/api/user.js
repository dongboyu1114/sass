import request from '@/utils/request'

// 登录接口封装
export function login (data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户资料接口
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 封装获取用户信息接口
export function getUSerDetailById (id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get',
  })
}
export function logout () {

}
