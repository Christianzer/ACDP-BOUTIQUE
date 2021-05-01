import Vue from 'vue'
import Vuex from 'vuex'
import utilisateurs from './modules/utilisateurs'
import articles from './modules/articles'
import catalogue from "./modules/catalogue";
import getters from './getters'
import achats from "./modules/achats";
import caissier from "./modules/caissier";
import manager from "./modules/manager";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    utilisateurs,
    articles,
    catalogue,
    achats,
    caissier,
    manager
  },
  strict: process.env.NODE_ENV !== 'production',
  getters
})

export default store
