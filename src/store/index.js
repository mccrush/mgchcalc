import { createStore } from 'vuex'
import user from './modules/user'
import admin from './modules/admin'
import pathname from './modules/pathname'

export default createStore({
  modules: {
    user,
    admin,
    pathname
  }
})
