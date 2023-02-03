// 员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/permission', // 路由地址
  name: 'permission', // 给模块的一级路由加一个name属性 这个属性我们会在后面用到
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理'
    }
  }]
}
