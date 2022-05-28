export default {
  state: {
    adminRazdel: localStorage.getItem('cl-adminRazdel') || 'obrabotkavid',
    adminList: localStorage.getItem('cl-adminList') || 'ListObrabotkavid',
    adminForm: localStorage.getItem('cl-adminForm') || 'FormObrabotkavid',
    adminItemId: localStorage.getItem('cl-adminItemId') || ''
  },
  mutations: {
    setAdminValue(state, { type, value }) {
      state[type] = value
      localStorage.setItem('cl-' + type, value)
    }
  },
  getters: {
    adminRazdel: state => state.adminRazdel,
    adminList: state => state.adminList,
    adminForm: state => state.adminForm,
    adminItemId: state => state.adminItemId
  }
}