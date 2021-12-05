import fireApp from '@/firebase'
import { getFirestore, doc, setDoc, collection, query, getDocs } from "firebase/firestore"
const db = getFirestore(fireApp)

export default {
  state: {
    group: [],
    siryo: [],
    rabota: []
  },
  mutations: {
    addItem(state, { item }) {
      state[item.type].push(item)
    },
    setItems(state, { type, items }) {
      state[type] = items
    }
  },
  actions: {
    async getItems({ commit }, { type }) {
      let tempArray = []
      const q = query(collection(db, type))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data())
      })
      commit('setItems', { type, items: tempArray })
    },
    async addItem({ commit }, { item }) {
      try {
        console.log('addItem store', item)
        await setDoc(doc(db, item.type, item.id), item)
        console.log('Данные добавлены')
      } catch (error) {
        console.log('error admin.js:', error)
      }
    }
  },
  getters: {
    group: state => state.group,
    siryo: state => state.siryo,
    rabota: state => state.rabota
  }
}