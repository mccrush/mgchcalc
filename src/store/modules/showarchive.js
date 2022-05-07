export default {
  state: {
    showArchive: localStorage.getItem('cl-showArchive') === 'true' ? true : false
  },
  mutations: {
    setShowArchive(state, showArchive) {
      state.showArchive = showArchive
      localStorage.setItem('cl-showArchive', showArchive)
    }
  },
  getters: {
    showArchive: state => state.showArchive
  }
}