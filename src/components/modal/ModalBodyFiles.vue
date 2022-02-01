<template>
  <div class="row mt-2">
    <div class="col-6">
      <ul class="list-group">
        <li
          v-for="file in item.files"
          :key="file.title"
          class="list-group-item"
        >
          <div class="row align-items-center">
            <div class="col-8 small">
              {{ file.title }}
            </div>
            <div class="col-2 pe-0">
              <a
                :href="file.link"
                class="btn btn-sm btn-outline-secondary w-100"
                :download="file.title"
                >Скачать</a
              >
            </div>
            <div class="col-2">
              <ButtonTrash />
            </div>
          </div>
        </li>
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
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['item'],
  data() {
    return {
      files: [
        { id: '11', title: 'Some title of file one', link: 'https://downlink' },
        { id: '12', title: 'Else one of files', link: 'https://downlink' },
        {
          id: '13',
          title: 'More lont title of download files',
          link: 'https://downlink'
        }
      ]
    }
  },
  methods: {
    async loadFile(e) {
      const file = e.target.files[0]
      console.log('ModalBodyFiles:loadfile:file:', file)
      if (file) {
        const size = +(file.size / 1024 / 1024).toFixed(2)
        console.log('ModalBodyFiles:loadfile:size:', size, 'Mb')
        if (size > 5) {
          alert('Размер файла более 5 Мб!')
          return false
        }

        console.log('ModalBodyFiles:loadfile:file.name:', file.name)

        const downloadLink = await this.$store.dispatch('addFile', {
          item: this.item,
          file
        })
        console.log('ModalBodyFiles:loadfile:link:', downloadLink)

        const fileItem = {
          title: file.name,
          link: downloadLink,
          size
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