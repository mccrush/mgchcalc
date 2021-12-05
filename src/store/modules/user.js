import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
const auth = getAuth()

export default {
  state: {
    userId: null
  },
  mutations: {
    setUserId(state, value) {
      state.userId = value
    }
  },
  actions: {
    async logIn({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (err) {
        throw err
      }
    },
    async logOut() {
      try {
        await signOut(auth)
      } catch (error) {
        console.log('user.js logOut(): Ошибка при выходе из системы, err:', error)
      }
    }
  },
  getters: {
    userId: state => state.userId
  }
}