import fireApp from '@/firebase'
import { getFirestore, doc, setDoc, updateDoc, collection, query, getDocs } from "firebase/firestore"
const db = getFirestore(fireApp)

export default {
  state: {
    group: [],
    siryo: [],
    rabota: []
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
    }
  },
  actions: {
    async updateItem({ commit }, { item }) {
      try {
        const itemRef = doc(db, item.type, item.id)
        await updateDoc(itemRef, item)
        console.log('Данные обновлены')
      } catch (error) {
        console.log('error admin.js updateItem:', error)
      }


    },
    async addItem({ commit }, { item }) {
      try {
        await setDoc(doc(db, item.type, item.id), item)
        console.log('Данные добавлены')
      } catch (error) {
        console.log('error admin.js addItem:', error)
      }
    },
    async getItems({ commit }, { type }) {
      let tempArray = []
      const q = query(collection(db, type))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data())
      })
      commit('setItems', { type, items: tempArray })
    }
  },
  getters: {
    group: state => state.group,
    siryo: state => state.siryo,
    rabota: state => state.rabota
  }
}