<template>
  <div class="row">
    <div class="col-12">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название</label>
      </form>
    </div>
    <div class="col-6 mt-2 pe-0">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputNacenka"
          v-model.number="item.nacenka"
          @blur="$emit('save-item')"
        />
        <label for="inputNacenka">Наценка %</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputNacenka"
          v-model.number="item.othody"
          @blur="$emit('save-item')"
        />
        <label for="inputNacenka">Отход %</label>
      </form>
    </div>
    <div class="col-12 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.number="item.position"
          @blur="$emit('save-item')"
        />
        <label for="inputTitle">Позиция</label>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>