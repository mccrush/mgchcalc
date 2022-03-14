import fireApp from '@/firebase'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
const auth = getAuth(fireApp)
const db = getFirestore(fireApp)

export default {
  state: {
    userId: null,
    userData: null
  },
  mutations: {
    setUserId(state, value) {
      state.userId = value
    },
    setUserData(state, value) {
      state.userData = value
    }
  },
  actions: {
    async getUserData({ commit }, id) {
      try {
        const docRef = doc(db, 'user', id)
        const user = await getDoc(docRef)
        commit('setUserData', user.data())
      } catch (err) {
        console.log('user.js getUserData(): Ошибка при получении данных пользователя, err:', error)
        throw err
      }
    },
    async logIn({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (err) {
        console.log('user.js logIn(): Ошибка при входе в систему, err:', error)
        throw err
      }
    },
    async logOut({ commit }) {
      try {
        await signOut(auth)
      } catch (error) {
        console.log('user.js logOut(): Ошибка при выходе из системы, err:', error)
      }
    }
  },
  getters: {
    userId: state => state.userId,
    userData: state => state.userData
  }
}