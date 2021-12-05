import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import fireApp from '@/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(fireApp)


let app

onAuthStateChanged(auth, (user) => {
  if (!app) {
    createApp(App).use(store).mount('#app')
    store.dispatch('getItems', { type: 'group' })
    store.dispatch('getItems', { type: 'siryo' })
  }

  if (user) {
    store.commit('setUserId', user.uid)
  } else {
    store.commit('setUserId', '')
    console.log('main.js: Пользователь не авторизован. user = ', user)
  }
})