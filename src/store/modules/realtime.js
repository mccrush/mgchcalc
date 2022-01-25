import getWeek from '@/scripts/getWeek'
import fireApp from '@/firebase'
import { getDatabase, ref, set } from 'firebase/database'
const db = getDatabase(fireApp)

export default {
  state: {
    loadingRT: false,
    order: [],
    nafrezer: []
  },
  mutations: {
    addItemRT(state, { item }) {
      state[item.type].push(item)
    },
    updateLoadingStatusRT(state, value) {
      state.loadingRT = value
    },
  },
  actions: {
    async addItemRT({ commit }, { item }) {
      try {
        commit('updateLoadingStatusRT', true)
        commit('addItemRT', { item })
        await set(ref(db, item.type + '/' + item.id), item)
        commit('updateLoadingStatusRT', false)
      } catch (error) {
        console.log('error realtime.js addItemRT:', error)
      }
    }
  },
  getters: {
    loadingRT: state => state.loadingRT,
    order: state => state.order,
    nafrezer: state => state.nafrezer,
    orderNumber: state => +state.order.filter(item => item.dateCreateWeek == getWeek()).length + 1 || 1,
    parentOrder: state => id => state.order.find(item => item.id === id) || false
  }
}