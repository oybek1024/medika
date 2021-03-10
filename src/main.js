import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import { VuexAltPlugin } from 'vuex-alt'
import { sync } from 'vuex-router-sync'

import Meta from 'vue-meta'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Meta)
Vue.use(Vuex)
Vue.use(Router)

import { createRouter } from './router'
import { createStore } from './store'

let store = createStore()
let router = createRouter()

Vue.use(VuexAltPlugin, { store})

// add route to store, ex: store.state.route
sync(store, router)

// Tailwind
import './assets/css/main.css'
require('./assets/css/feathericon.css')
import 'tailwindcss/tailwind.css'

import { myAxios, myAuthAxios } from 'Libs/api'
Vue.prototype.$myAxios = myAxios
Vue.prototype.$myAuthAxios = myAuthAxios

import error from 'Libs/error.js'
Vue.prototype.$error = error

import message from 'Libs/message.js'
Vue.prototype.$message = message

import { checkDate, checkDateRDV, getFileLink, getRdv, getRdvDossier } from 'Libs/helper.js'
Vue.prototype.$getRdvDossier = getRdvDossier;
Vue.prototype.$checkDate = checkDate;
Vue.prototype.$checkDateRDV = checkDateRDV;
Vue.prototype.$getFileLink = getFileLink;
Vue.prototype.$getRdv = getRdv;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
