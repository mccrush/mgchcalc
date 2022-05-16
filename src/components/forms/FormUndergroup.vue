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
    <div class="col-12 mt-2">
      <form class="form-floating">
        <select
          class="form-select"
          id="inputGroup"
          v-model="item.groupId"
          @change="$emit('save-item')"
        >
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.title }}
          </option>
        </select>
        <label for="inputGroup">Группа</label>
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
export default {
  props: ['item'],
  emits: ['save-item'],
  computed: {
    groups() {
      return this.$store.getters.group
    }
  }
}
</script>