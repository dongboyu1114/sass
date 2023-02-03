// 员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/departments', // 路由地址
  name: 'departments', // 给模块的一级路由加一个name属性 这个属性我们会在后面用到
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构'
    }
  }]
}
