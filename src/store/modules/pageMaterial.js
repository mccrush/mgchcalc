export default {
  state: {
    materialMode: localStorage.getItem('cl-materialMode') || 'show',
    materialGroupId: localStorage.getItem('cl-materialGroupId') || '',
    materialUndergroupId: localStorage.getItem('cl-materialUndergroupId') || '',
    materialMaterialId: localStorage.getItem('cl-materialMaterialId') || '',
    materialForm: localStorage.getItem('cl-materialForm') || 'material',
    materialPostavshikId: localStorage.getItem('cl-materialPostavshikId') || ''
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
    materialMaterialId: state => state.materialMaterialId,
    materialForm: state => state.materialForm,
    materialPostavshikId: state => state.materialPostavshikId
  }
}