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
    store.dispatch('getItems', { type: 'group' })
    store.dispatch('getItems', { type: 'siryo' })
    store.dispatch('getItems', { type: 'frezer' })
    store.dispatch('getItems', { type: 'rabota' })
    store.dispatch('getItems', { type: 'dopuslug' })
  } else {
    store.commit('setUserId', null)
    console.log('main.js: Пользователь не авторизован. user = ', user)
  }
})