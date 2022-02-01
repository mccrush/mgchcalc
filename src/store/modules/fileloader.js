import fireApp from '@/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const storage = getStorage(fireApp)
const year = new Date().getFullYear()

export default {
  state: {},
  mutations: {},
  actions: {
    async addFile({ commit }, { item, file }) {
      try {
        const mountainFileRef = ref(storage, item.type + '/' + year + '/' + item.id + '/' + file.name)
        console.log('fileload.js:addFile:mountainFileRe.ffullPath', mountainFileRef.fullPath)

        const snapshot = await uploadBytes(mountainFileRef, file)
        const downloadLink = await getDownloadURL(snapshot.ref)
        console.log('fileload.js:addFile:downloadLink', downloadLink)
        return downloadLink
      } catch (error) {
        console.error('fileload.js addFile:', error)
      }
    }
  }
}