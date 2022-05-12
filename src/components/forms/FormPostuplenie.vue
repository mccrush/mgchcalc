<template>
  <div class="row">
    <div class="col-12">
      <form class="form-floating">
        <select
          class="form-select"
          id="inputPostavshik"
          v-model="item.postavshikId"
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

    <div class="col-6 mt-2 pe-0">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputObyom"
          v-model.number="item.obyom"
          @blur="$emit('save-item')"
        />
        <label for="inputObyom">Объем</label>
      </form>
    </div>
    <div class="col-6 mt-2">
      <form class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputCena"
          v-model.number="item.cena"
          @blur="$emit('save-item')"
        />
        <label for="inputCena">Цена</label>
      </form>
    </div>

    <div class="col-12">
      <div class="form-floating">
        <input
          type="datetime-local"
          class="form-control form-control-sm"
          id="inputDate"
          v-model="item.dateCreate"
          @change="$emit('save-item')"
        />
        <label for="inputDate">Дата поступления</label>
      </div>
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
  computed: {
    postavshiki() {
      return this.$store.getters.postavshik
    }
  }
}
</script>