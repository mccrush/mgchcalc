import fireApp from '@/firebase'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
const auth = getAuth(fireApp)

export default {
  state: {
    userId: ''
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
        console.log('user.js logIn(): Пользователь авторизован')
      } catch (err) {
        console.log('user.js logIn(): Ошибка при входе в систему, err:', error)
        throw err
      }
    },
    async logOut() {
      try {
        await signOut(auth)
        console.log('user.js logOut(): Пользователь вышел из системы')
      } catch (error) {
        console.log('user.js logOut(): Ошибка при выходе из системы, err:', error)
      }
    }
  },
  getters: {
    userId: state => state.userId
    //userId: state => 123
  }
}