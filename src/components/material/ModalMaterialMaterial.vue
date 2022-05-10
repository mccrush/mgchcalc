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
        <select
          class="form-select"
          id="inputGroup"
          v-model="item.categoryId"
          @change="$emit('save-item')"
        >
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.title }}
          </option>
        </select>
        <label for="inputGroup">Группа</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <select
          class="form-select"
          id="inputEd"
          v-model.number="item.ed"
          @change="$emit('save-item')"
        >
          <option v-for="e in ed" :key="e" :value="e">{{ e }}</option>
        </select>
        <label for="inputEd">Единицы</label>
      </form>
    </div>
    <div class="col-6 mt-2 pe-0">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrice"
          v-model.number="item.price"
          @change="$emit('save-item')"
        />
        <label for="inputPrice">Стоимость</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPosition"
          v-model.number="item.position"
          @change="$emit('save-item')"
        />
        <label for="inputPosition">Позиция</label>
      </form>
    </div>
    <div class="col-12 mt-2">
      <form class="form-floating">
        <select
          class="form-select"
          id="inputPostavshik"
          v-model="item.postavshik"
          @change="$emit('save-item')"
        >
          <option
            v-for="postavshik in postavshiki"
            :key="postavshik.id"
            :value="postavshik.id"
          >
            {{ postavshik.title }}
          </option>
        </select>
        <label for="inputPostavshik">Поставщик</label>
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
import ed from './../../data/ed'
export default {
  props: ['item'],
  data() {
    return {
      ed
    }
  },
  computed: {
    groups() {
      return this.$store.getters.materialvid
    },
    postavshiki() {
      return this.$store.getters.postavshik
    }
  }
}
</script>