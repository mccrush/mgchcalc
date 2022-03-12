<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3 pb-0">
    <div class="row pt-3">
      <div class="col-12 col-sm-6 col-md-3">
        <select
          class="form-select form-select-sm w-100"
          aria-label="Select group resourse"
          v-model="razdel"
        >
          <option
            v-for="razdel in razdels"
            :key="razdel.alias"
            :value="razdel.alias"
          >
            {{ razdel.title }}
          </option>
        </select>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        {{ razdel }}
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <button class="btn btn-sm btn-secondary w-100" @click="getBackup">
          Извлечь
        </button>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <button class="btn btn-sm btn-secondary w-100" @click="copyInBuffer">
          Копировать
        </button>
      </div>
    </div>
    <div class="row pt-2 pb-3">
      <div class="col-12">
        <textarea
          ref="textarea"
          class="form-control w-100"
          rows="16"
          v-html="backup"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import razdels from '@/data/razdels'

export default {
  data() {
    return {
      razdels,
      razdel: 'materialvid',
      backup: []
    }
  },
  methods: {
    getBackup() {
      this.backup = JSON.stringify(this.$store.getters[this.razdel])
    },
    copyInBuffer() {
      const el = this.$refs.textarea
      el.select()
      if (document.execCommand('copy')) {
        console.log('Результат скопирован в буфер')
      }
    }
  }
}
</script>