import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import TareasView from '@/views/TareasView.vue'
import WorkspaceView from '@/views/WorkspaceView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import { estaAutenticado } from '@/servicios/autenticacion'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {path: "/register", component: RegisterView}, //meta:{requiereLogin:true}
    {path: "/login", component: LoginView},
    {path: "/workspace", component: WorkspaceView, meta:{requiereLogin:true}},
    {path: "/", component: TareasView, meta:{requiereLogin:true}}
  ],
})
router.beforeEach((to, from, next)=>{
  if(to.meta.requiereLogin){
    if(estaAutenticado()){
      // ifemail esta verif next ==> else ==> q se vaya a login
      // if()
      next() //si esta login le dejo pasar /login?
    }else{
      next("/login") //q se vaya a register 
    }
  }else{
    next()
  }
})

export default router
