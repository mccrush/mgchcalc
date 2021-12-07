import fireApp from '@/firebase'
import { getFirestore, doc, setDoc, updateDoc, collection, query, getDocs } from "firebase/firestore"
const db = getFirestore(fireApp)

export default {
  state: {
    group: [],
    siryo: [],
    rabota: [],
    rabotaPrice: [],
    loading: false,
  },
  mutations: {
    updateItem(state, { item }) {
      const index = state[item.type].findIndex(el => el.id === item.id)
      state[item.type][index] = item
    },
    addItem(state, { item }) {
      state[item.type].push(item)
    },
    setItems(state, { type, items }) {
      state[type] = items
    },
    updateLoadingStatus(state, value) {
      state.loading = value
    },
  },
  actions: {
    async updateItem({ commit }, { item }) {
      try {
        commit('updateLoadingStatus', true)
        const itemRef = doc(db, item.type, item.id)
        await updateDoc(itemRef, item)
        commit('updateLoadingStatus', false)
        console.log('Данные обновлены')
      } catch (error) {
        console.log('error admin.js updateItem:', error)
      }


    },
    async addItem({ commit }, { item }) {
      try {
        commit('updateLoadingStatus', true)
        await setDoc(doc(db, item.type, item.id), item)
        commit('updateLoadingStatus', false)
        console.log('Данные добавлены')
      } catch (error) {
        console.log('error admin.js addItem:', error)
      }
    },
    async getItems({ commit }, { type }) {
      commit('updateLoadingStatus', true)
      let tempArray = []
      const q = query(collection(db, type))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data())
      })
      commit('setItems', { type, items: tempArray })
      commit('updateLoadingStatus', false)
    }
  },
  getters: {
    group: state => state.group,
    siryo: state => state.siryo,
    rabota: state => state.rabota,
    rabotaPrice: state => state.rabotaPrice,
    loading: state => state.loading
  }
}