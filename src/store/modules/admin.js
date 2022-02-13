import fireApp from '@/firebase'
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, collection, query, getDocs } from "firebase/firestore"
const db = getFirestore(fireApp)

export default {
  state: {
    loading: false,
    procent: [{ value: 0 }],
    materialvid: [],
    material: [],
    obrabotkavid: [],
    obrabotkatolshina: [],
    dopuslug: [],
    customer: []
  },
  mutations: {
    removeItem(state, { type, id }) {
      state[type] = state[type].filter(item => item.id !== id)
    },
    updateItem(state, { item }) {
      const index = state[item.type].findIndex(el => el.id === item.id)
      state[item.type][index] = item
      console.log('admin.js: m updateItem(): Данные обновлены')
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
    async removeItem({ commit }, { type, id }) {
      try {
        commit('updateLoadingStatus', true)
        await deleteDoc(doc(db, type, id))
        commit('updateLoadingStatus', false)
        console.log('admin.js: removeItem(): Данные удалены')
      } catch (error) {
        console.error('admin.js: removeItem(): error', error)
      }
    },
    async updateItem({ commit }, { item }) {
      try {
        commit('updateLoadingStatus', true)
        const itemRef = doc(db, item.type, item.id)
        await updateDoc(itemRef, item)
        commit('updateLoadingStatus', false)
        console.log('admin.js: a updateItem(): Данные обновлены')
      } catch (error) {
        console.error('admin.js: updateItem(): error', error)
      }
    },
    async addItem({ commit }, { item }) {
      try {
        commit('updateLoadingStatus', true)
        await setDoc(doc(db, item.type, item.id), item)
        commit('updateLoadingStatus', false)
        console.log('admin.js: addItem(): Данные добавлены')
      } catch (error) {
        console.error('admin.js: addItem(): error', error)
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
    loading: state => state.loading,
    procent: state => state.procent,
    materialvid: state => state.materialvid,
    material: state => state.material,
    obrabotkavid: state => state.obrabotkavid,
    obrabotkatolshina: state => state.obrabotkatolshina,
    dopuslug: state => state.dopuslug,
    customer: state => state.customer
  }
}