import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUSerDetailById } from '@/api/user'
// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化 如何实现 ？ Vuex和前端缓存相结合
const state = {
  token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
  userInfo: {} // 这里定义一个空对象
}
// 修改状态
const mutations = {
  // 设置token
  setToken (state, token) {
    state.token = token // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存
  removeToken (state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  setUserInfo (state, result) {
    // 更新一个对象
    state.userInfo = result // 这样是响应式
  },
  removeUserInfo (state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login (context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    context.commit('setToken', result)
    setTimeStamp() // 设置当前的时间戳
  },
  async getUserInfo (context) {
    const result = await getUserInfo()
    // 获取用户详情
    const baseInfo = await getUSerDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result // 给我们后期做权限留下的伏笔
  },
  // 登出操作
  logout (context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
