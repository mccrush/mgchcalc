export default {
  state: {
    materialMode: localStorage.getItem('cl-materialMode') || 'show',
    materialGroupId: localStorage.getItem('cl-materialGroupId') || '',
    materialUndergroupId: localStorage.getItem('cl-materialUndergroupId') || '',
    materialForm: localStorage.getItem('cl-materialForm') || 'material'
  },
  mutations: {
    setMaterialValue(state, { type, value }) {
      state[type] = value
      localStorage.setItem('cl-' + type, value)
    }
  },
  getters: {
    materialMode: state => state.materialMode,
    materialGroupId: state => state.materialGroupId,
    materialUndergroupId: state => state.materialUndergroupId,
    materialForm: state => state.materialForm
  }
}