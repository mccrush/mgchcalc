import fireApp from '@/firebase'
import { getStorage, ref } from 'firebase/storage'
const storage = getStorage(fireApp)


export default {
  actions: {
    async addFile() {
      try {

      } catch (error) {
        console.error('fileload.js addFile:', error)
      }
    }
  }
}