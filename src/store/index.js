import getDateNow from './../scripts/getDateNow'
import { createStore } from 'vuex'
import user from './modules/user'
import admin from './modules/admin'
import pathname from './modules/pathname'
import realtime from './modules/realtime'
import fileloader from './modules/fileloader'
import showarchive from './modules/showarchive'
import pageMaterial from './modules/pageMaterial'
import loginMessage from './modules/loginMessage'

export default createStore({
  modules: {
    user,
    admin,
    pathname,
    realtime,
    fileloader,
    showarchive,
    pageMaterial,
    loginMessage
  },
  actions: {
    updateItemStatus({ dispatch, getters }, { item }) {
      console.log('Index.js: updateItemStatus Run');

      if (item.type === 'order') {
        if (item.status === 'doneorder') {
          const nafrezer = getters.nafrezer.filter(
            elem => elem.orderId === item.id
          )

          nafrezer.forEach(elem => {
            elem.dateFinish = getDateNow()
            elem.status = 'arhivefrezer'
            dispatch('updateItemRT', { item: elem })
          })
        } else if (
          item.status === 'successorder' ||
          item.status === 'failorder'
        ) {
          item.dateFinish = getDateNow()
        } else {
          item.dateFinish = ''
        }
      } else if (item.type === 'nafrezer') {
        if (item.status === 'donefrezer') {
          item.dateFinish = getDateNow()
        } else {
          item.dateFinish = ''
          let parentOrder = getters.parentOrder(item.orderId)
          parentOrder.status = 'nafrezer'
          dispatch('updateItemRT', { item: parentOrder })
        }
      }

      dispatch('updateItemRT', { item })
    }
  }
})
