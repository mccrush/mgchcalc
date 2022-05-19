import fireApp from './../../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
const storage = getStorage(fireApp)
const year = new Date().getFullYear()

export default {
  state: {
    loadingFL: false,
  },
  mutations: {
    updateLoadingStatusFL(state, value) {
      state.loadingFL = value
    },
  },
  actions: {
    async removeFile({ commit }, { fileRef }) {
      try {
        const mountainFileRef = ref(storage, fileRef)
        await deleteObject(mountainFileRef)
      } catch (error) {
        console.error('fileload.js removeFile:', error)
      }
    },
    async addFile({ commit }, { item, file }) {
      try {
        commit('updateLoadingStatusFL', true)
        const mountainFileRef = ref(storage, item.type + '/' + year + '/' + item.id + '/' + file.name)
        console.log('fileload.js: addFile: mountainFileRe.ffullPath', mountainFileRef.fullPath)

        const snapshot = await uploadBytes(mountainFileRef, file)
        const downloadLink = await getDownloadURL(snapshot.ref)
        commit('updateLoadingStatusFL', false)
        console.log('fileload.js: addFile: downloadLink', downloadLink)
        return { downloadLink, fileRef: mountainFileRef.fullPath }
      } catch (error) {
        console.error('fileload.js addFile:', error)
      }
    }
  },
  getters: {
    loadingFL: state => state.loadingFL
  }
}