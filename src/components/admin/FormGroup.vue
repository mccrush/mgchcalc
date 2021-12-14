<template>
  <div class="row pt-2 pb-2">
    <div class="col-12">
      <div class="row">
        <div class="col-3">---</div>
        <div class="col-3 pe-0">
          <div
            class="btn-group btn-group-sm w-100"
            role="group"
            aria-label="..."
          >
            <button type="button" class="btn btn-outline-light text-muted">
              Left
            </button>
            <button type="button" class="btn btn-outline-light text-muted">
              Middle
            </button>
            <button type="button" class="btn btn-outline-light text-muted">
              Right
            </button>
            <button type="button" class="btn btn-outline-light text-muted">
              Right
            </button>
          </div>
        </div>
        <div class="col-3 pe-0">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model.trim="search"
            placeholder="Поиск"
          />
        </div>
        <div class="col-3">
          <button class="btn btn-sm btn-outline-success w-100">
            Создать +
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 pt-2">
      <div v-for="item in items" :key="item.id" class="row mt-1">
        <div class="col-6">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model.trim="item.title"
          />
        </div>
        <div class="col-5">---</div>
        <div class="col-1 text-end"><ButtonTrash /></div>
      </div>
    </div>
  </div>
</template>


<script>
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['type'],
  computed: {
    items() {
      return this.$store.getters[this.type]
    }
  }
}
</script>