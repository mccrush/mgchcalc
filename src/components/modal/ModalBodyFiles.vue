<template>
  <div class="row mt-2">
    <div class="col-12 col-md-10 col-lg-8 col-xl-6 pe-md-0">
      <ul v-if="item.files" class="list-group">
        <li class="list-group-item p-0 border-0 border-bottom">
          <div class="progressbar">
            <Progressbar v-if="loading" />
            <ProgressbarOff v-else />
          </div>
        </li>
        <li
          v-for="(file, index) in item.files"
          :key="file.title"
          class="list-group-item"
        >
          <div class="row align-items-center">
            <div class="col-12 col-sm-6 small">
              {{ file.title }}
            </div>
            <div class="col-6 col-sm-4 pe-0">
              <a
                :href="file.link"
                class="btn btn-sm btn-outline-secondary w-100"
                :download="file.title"
                target="_blank"
                >Скачать [{{ file.size }} Мб]</a
              >
            </div>
            <div class="col-6 col-sm-2">
              <ButtonTrash @click="removeFile(file.fileRef, index)" />
            </div>
          </div>
        </li>
      </ul>
      <ul class="list-group">
        <li class="list-group-item">
          <div class="row">
            <div class="col-12">
              <div class="">
                <label for="formFileSm" class="form-label small"
                  >Добавить еще один файл</label
                >
                <input
                  class="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  @change="loadFile"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Progressbar from './../interface/Progressbar.vue'
import ProgressbarOff from './../interface/ProgressbarOff.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    Progressbar,
    ProgressbarOff,
    ButtonTrash
  },
  props: ['item'],
  computed: {
    loading() {
      return this.$store.getters.loadingFL
    }
  },
  methods: {
    removeFile(fileRef, index) {
      this.$store.dispatch('removeFile', { fileRef })
      this.item.files.splice(index, 1)
      this.$store.dispatch('updateItemRT', { item: this.item })
    },
    async loadFile(e) {
      const file = e.target.files[0]
      console.log('ModalBodyFiles:loadfile:file:', file)
      if (file) {
        const size = Number((file.size / 1024 / 1024).toFixed(2))
        console.log('ModalBodyFiles:loadfile:size:', size, 'Mb')
        if (size > 50) {
          alert('Размер файла более 50 Мб!')
          return false
        }

        console.log('ModalBodyFiles:loadfile:file.name:', file.name)

        const { downloadLink, fileRef } = await this.$store.dispatch(
          'addFile',
          {
            item: this.item,
            file
          }
        )
        console.log('ModalBodyFiles:loadfile:link:', downloadLink)

        const fileItem = {
          title: file.name,
          link: downloadLink,
          size,
          fileRef
        }

        console.log('ModalBodyFiles:loadfile:fileItem:', fileItem)
        if (!this.item.files) {
          this.item.files = []
        }
        this.item.files.push(fileItem)
        this.$store.dispatch('updateItemRT', { item: this.item })
      }
    }
  }
}
</script>