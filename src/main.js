import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import fireApp from '@/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(fireApp)


let app

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App).use(store).mount('#app')
  }

  if (user) {
    console.log('main.js : Пользователь авторизован')
    store.commit('setUserId', user.uid)
    store.dispatch('getItems', { type: 'materialvid' })
    store.dispatch('getItems', { type: 'material' })
    store.dispatch('getItems', { type: 'obrabotkavid' })
    store.dispatch('getItems', { type: 'obrabotkatolshina' })
    store.dispatch('getItems', { type: 'dopuslug' })
    store.dispatch('getItems', { type: 'procent' })
    store.dispatch('getItemsRT', { type: 'order' })
    store.dispatch('getItemsRT', { type: 'nafrezer' })
  } else {
    store.commit('setUserId', null)
    console.log('main.js: Пользователь не авторизован. user = ', user)
  }
})