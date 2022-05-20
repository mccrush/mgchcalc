<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-start align-items-center mt-2 mt-md-0">
        <ButtonBack />
        <h4 v-if="item" class="m-0 ms-2">{{ item.title }}</h4>
      </div>
      <hr class="mt-2" />
    </div>
    <div class="col-6 pe-1">
      <form class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название группы</label>
      </form>
    </div>
    <!-- <div class="col-6 mt-2 pe-0">
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
    </div> -->
    <!-- <div class="col-6 mt-2">
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
    </div> -->
    <div class="col-6 ps-1">
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
    <div class="col-12 mt-2">
      <form class="form-floating">
        <textarea
          class="form-control form-control-sm"
          id="inputDescription"
          v-model.trim="item.description"
          @change="$emit('save-item')"
        ></textarea>
        <label for="inputDescription">Комментарий</label>
      </form>
    </div>
  </div>
</template>

<script>
import ButtonBack from './../elements/buttons/ButtonBack.vue'

export default {
  components: {
    ButtonBack
  },
  props: ['item'],
  emits: ['save-item']
}
</script>