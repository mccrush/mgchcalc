import getLoginMessage from './../../scripts/getLoginMessage'

export default {
  state: {
    loginMessage: { text: '', type: '' }
  },
  mutations: {
    addMessage(state, code) {
      state.loginMessage = getLoginMessage(code)
    }
  },
  getters: {
    loginMessage: state => state.loginMessage
  }
}