import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/noteClass'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/noteClass',
      name: 'noteClass',
      component: () => import('@/views/NoteClass.vue'),
      meta: {
        title: '日记分类'
      }
    },
    {
      path: '/noteList',
      name: 'noteList',
      component: () => import('@/views/NoteList.vue'),
      meta: {
        title: '日记列表'
      }
    }
    ,
    {
      path: '/noteDetail',
      name: 'noteDetail',
      component: () => import('@/views/NoteDetail.vue'),
      meta: {
        title: '日记列表'
      }
    }
    ,
    {
      path: '/notePublish',
      name: 'notePublish',
      component: () => import('@/views/NotePublish.vue'),
      meta: {
        title: '日记发布'
      }
    }
  ]
})

// 全局前置守卫
const whitePath = ['/login', '/register', '/noteClass', '/noteList']
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (!whitePath.includes(to.path)) {
    // 判断本地有无用户数据
    if (!sessionStorage.getItem('userInfo')) {
      router.push('/login')
      return
      // return { name: 'login' }
    }
    next()
    return
  }
  next()
  return
})


export default router
