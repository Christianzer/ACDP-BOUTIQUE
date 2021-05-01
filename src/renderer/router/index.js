import Vue from 'vue'
import Router from 'vue-router'
import MenuManager from "@/components/Layout/MenuManager";
import MenuCaissier from "@/components/Layout/MenuCaissier";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/Login').default
    },
    {
      path:'/manager',
      redirect:'menu_manager',
      component:MenuManager,
      children:[
        {
          path:'/manager',
          name:'menu_manager',
          component:()=>import('@/components/Dashboard/TableauBordManager.vue')
        },
        {
          path:'/gestionstock',
          name:'gestionstock',
          component:()=>import('@/components/Stock/index.vue')
        },
        {
          path:'/caisse',
          name:'caisse',
          component:()=>import('@/components/Caisse.vue')
        }
      ]
    },
    {
      path:'/caissier',
      redirect:'menu_caissier',
      component:MenuCaissier,
      children:[
        {
          path:'/caissier',
          name:'menu_caissier',
          component:()=>import('@/components/Dashboard/TableauBordCaissier.vue')
        },
        {
          path:'/gestion_vente',
          name:'gestion_vente',
          component:()=>import('@/components/Vente/index.vue')
        },
        {
          path:'/panier',
          name:'panier',
          component:()=>import('@/components/Vente/panier.vue')
        },
        {
          path:'/facture',
          name:'facture',
          component:()=>import('@/components/Vente/facture.vue')
        }

      ]
    },
    {
      path: '/deconnexion',
      name: 'deconnexion',
      redirect: '/'
    }
  ]
})
