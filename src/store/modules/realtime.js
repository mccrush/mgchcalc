import getWeek from '@/scripts/getWeek'
import fireApp from '@/firebase'
import { getDatabase, ref, set, onValue, update } from 'firebase/database'
const db = getDatabase(fireApp)

export default {
  state: {
    loadingRT: false,
    order: [],
    nafrezer: []
  },
  mutations: {
    setItemsRT(state, { type, items }) {
      state[type] = items
    },
    addItemRT(state, { item }) {
      state[item.type].push(item)
    },
    updateLoadingStatusRT(state, value) {
      state.loadingRT = value
    },
  },
  actions: {
    async updateItemRT({ commit }, { item }) {
      try {
        commit('updateLoadingStatusRT', true)
        await update(ref(db, item.type + '/' + item.id), item)
        commit('updateLoadingStatusRT', false)
      } catch (error) {
        console.log('error realtime.js addItemRT:', error)
      }
    },
    getItemsRT({ commit }, { type }) {
      try {
        commit('updateLoadingStatusRT', true)
        const itemsRef = ref(db, type)

        onValue(itemsRef, (snapshot) => {
          console.log('Run onValue')
          let tempArray = []
          const data = snapshot.val()
          for (let item in data) {
            tempArray.push(data[item])
          }
          commit('setItemsRT', { type, items: tempArray })
          commit('updateLoadingStatusRT', false)
        })
      } catch (error) {
        console.log('error realtime.js getItemsRT:', error)
      }
    },
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