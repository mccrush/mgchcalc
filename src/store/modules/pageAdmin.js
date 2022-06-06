export default {
  state: {
    adminRazdel: localStorage.getItem('cl-adminRazdel') || 'obrabotkavid',
    adminClass: localStorage.getItem('cl-adminClass') || 'Obrabotkavid',
    adminList: localStorage.getItem('cl-adminList') || 'ListObrabotkavid',
    adminForm: localStorage.getItem('cl-adminForm') || 'FormObrabotkavid',
    adminItemId: localStorage.getItem('cl-adminItemId') || '',
    categoryId: localStorage.getItem('cl-categoryId') || ''
  },
  mutations: {
    setAdminValue(state, { type, value }) {
      state[type] = value
      localStorage.setItem('cl-' + type, value)
    }
  },
  getters: {
    adminRazdel: state => state.adminRazdel,
    adminClass: state => state.adminClass,
    adminList: state => state.adminList,
    adminForm: state => state.adminForm,
    adminItemId: state => state.adminItemId,
    categoryId: state => state.categoryId
  }
}