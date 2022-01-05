export default {
  state: {
    pathname: localStorage.getItem('cl-pathname') || 'calc'
  },
  mutations: {
    setPath(state, path) {
      state.pathname = path
      localStorage.setItem('cl-pathname', path)
    }
  },
  getters: {
    pathname: state => state.pathname
  }
}